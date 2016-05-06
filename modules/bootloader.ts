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
import {Router as NgRouter} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {XHR} from '@angular/compiler';
import {DirectiveResolver} from '@angular/compiler/src/directive_resolver';
import {DOCUMENT} from '@angular/platform-browser';
import {Parse5DomAdapter} from '@angular/platform-server';
Parse5DomAdapter.makeCurrent(); // ensure Parse5DomAdapter is used
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
const DOM: any = getDOM();

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

import {Promise, waitRender} from './runtime';
import {Router} from './router';
import {MeteorXHRImpl} from './meteor_xhr_impl';

export class Bootloader {
  private static platRef: PlatformRef;

  serialize(component: Type): Promise<string> {
    let maxZoneTurns = 2000;

    return this.bootstrap(component).then(config => {
      return waitRender(config.appRef, maxZoneTurns).then(() => config);
    })
    .catch(err => {
      this.handleError('Async Error: ', err);
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
    .catch(err => {
      this.handleError('Preboot Error: ', err);
    })
    .then(config => {
      let document = config.appRef.injector.get(DOCUMENT);
      let rendered = serializeDocument(document);
      config.compRef.destroy();
      config.appRef.dispose();
      return rendered;
    })
    .catch(err => {
      this.handleError('Rendering Error: ', err);
    });
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
      coreLoadAndBootstrap(appInjector, component)).then(this.waitRouter);
    return compRef.then(compRef => ({ appRef, compRef }));
  }

  private waitRouter(compRef: ComponentRef<any>): Promise<ComponentRef<any>> {
    let injector = compRef.injector;
    let router = injector.get(NgRouter, NgRouter);

    if (router && router._currentNavigation) {
      return router._currentNavigation.then(() => Promise.resolve(compRef));
    }

    return Promise.resolve(true);
  }

  private createDoc(component: Type) {
    let selector = new DirectiveResolver().resolve(component).selector;
    let serverDoc = DOM.createHtmlDocument();
    let el = DOM.createElement(selector);
    DOM.appendChild(serverDoc.body, el);
    return serverDoc;
  }

  private handleError(format, err) {
    console.log(format, err);
    throw err;
  }
}
