'use strict';

import {
  ApplicationRef,
  ComponentRef,
  NgZone,
  PlatformRef,
  Provider,
  ReflectiveInjector,
  Type,
  createPlatform,
  coreLoadAndBootstrap,
  provide
} from '@angular/core';

NgZone.assertNotInAngularZone = function() {};

import {Http} from '@angular/http';
import {XHR} from '@angular/compiler';
import {DirectiveResolver} from '@angular/compiler/src/directive_resolver';
import {DOCUMENT} from '@angular/platform-browser';
import {Parse5DomAdapter} from '@angular/platform-server';
Parse5DomAdapter.makeCurrent(); // ensure Parse5DomAdapter is used
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
const DOM: any = getDOM();

import * as Future from 'fibers/future';

import {
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  NODE_PLATFORM_PIPES,
  NODE_LOCATION_PROVIDERS,
  REQUEST_URL,
  BASE_URL,
  ORIGIN_URL,
  queryParamsToBoolean,
  buildReflector,
  buildNodeProviders,
  buildNodeAppProviders,
  createPrebootCode,
  parseDocument,
  parseFragment,
  serializeDocument
} from 'angular2-universal';

import {METEOR_PROVIDERS, MeteorApp} from 'angular2-meteor';

import './runtime';
import {waitRender, waitRouter} from './utils';
import {Router} from './router';
import {MeteorXHRImpl} from './meteor_xhr_impl';

export class Bootloader {
  private static platRef: PlatformRef;

  serialize(component: Type): string {
    let future = new Future;

    this.bootstrap(component).then(config => {
      return waitRender(config.compRef).then(stable => {
        config.stable = stable;
        return config;
      });
    })
    .then(config => {
      let prebootCode = createPrebootCode(component, {
        start: false,
        debug: true,
        uglify: false
      });

      return prebootCode
        .then(code => {
          let el = config.compRef.location.nativeElement;
          let script = parseFragment(code);
          let prebootEl = DOM.createElement('div');
          DOM.setInnerHTML(prebootEl, code);
          DOM.insertAfter(el, prebootEl);
          return config;
        });
    })
    .then(config => {
      let document = config.appRef.injector.get(DOCUMENT);
      let html = serializeDocument(document);
      if (config.stable) {
        config.appRef.dispose();
      }
      return html;
    })
    .then(html => future.return(html))
    .catch(err => {
      console.log(err);
      future.throw(err);
    });

    return future.wait();
  }

  get appProviders() {
    return [
      ...NODE_PLATFORM_PIPES,
      ...NODE_HTTP_PROVIDERS,
      ...METEOR_PROVIDERS,
      ...NODE_ROUTER_PROVIDERS,
      ...NODE_LOCATION_PROVIDERS,
      provide(ORIGIN_URL, { useValue: global.process.env.ROOT_URL }),
      provide(BASE_URL, { useValue: Router.baseUrl }),
      new Provider(XHR, {
        useFactory: (ngZone) => {
          return new MeteorXHRImpl(ngZone);
        },
        deps: [NgZone]
      }),
      provide(REQUEST_URL, { useValue: Router.reqUrl })
    ];
  }

  private static get platform(): PlatformRef {
    if (!this.platRef) {
      let customProviders =
        ReflectiveInjector.resolveAndCreate(buildNodeProviders());
      this.platRef = createPlatform(customProviders);
    }
    return this.platRef;
  }

  private application(component: Type, providers?: any): any {
    let doc = this.createDoc(component);
    let customProviders = buildNodeAppProviders(doc, providers);
    var appinjector = ReflectiveInjector.resolveAndCreate(
      customProviders,
      Bootloader.platform.injector
    );
    return appinjector;
  }

  private bootstrap(component: Type) {
    let appInjector = this.application(component, this.appProviders);
    let appRef = appInjector.get(ApplicationRef);
    let compRef = MeteorApp.launch(appRef, () =>
      coreLoadAndBootstrap(appInjector, component));
    return compRef.then(compRef => ({ appRef, compRef }));
  }

  private createDoc(component: Type) {
    let selector = new DirectiveResolver().resolve(component).selector;
    let serverDoc = DOM.createHtmlDocument();
    let el = DOM.createElement(selector);
    DOM.appendChild(serverDoc.body, el);
    return serverDoc;
  }
}
