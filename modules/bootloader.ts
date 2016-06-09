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
  getPlatform,
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
import {isPresent, isBlank} from '@angular/core/src/facade/lang';

//import * as Future from 'fibers/future';

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

import {METEOR_PROVIDERS, MeteorApp, Providers} from 'angular2-meteor';

import {ServerOptions} from './bootstrap';
import {waitRender, waitRouter} from './utils';
import {Logger} from './logger';
import {Router} from './router';
import {MeteorXHRImpl} from './meteor_xhr_impl';

const Future = Npm.require('fibers/future');

export class Bootloader {
  private static platRef: PlatformRef;

  serialize(component: Type,
            providers: Providers,
            options: ServerOptions): string {

    if (!options.on) {
      let doc = this.createDoc(component);
      let html = serializeDocument(doc);
      return html;
    }

    let future = new Future;
    this.bootstrap(component, providers, options).then(config => {
      return waitRender(config.compRef, options.renderLimitMs)
        .then(stable => config);
    })
    .then(config => {
      let preboot = _.extend({ debug: options.debug }, options.preboot);
      let prebootCode = createPrebootCode(component, preboot);

      return prebootCode
        .then(code => {
          let el = config.compRef.location.nativeElement;
          let script = parseFragment(code);
          let prebootEl = DOM.createElement('div');
          DOM.setInnerHTML(prebootEl, code);
          DOM.insertAfter(el, prebootEl);
          let logger = config.appRef.injector.get(Logger);
          logger.debug('preboot source code rendered');
          return config;
        });
    })
    .then(config => {
      let doc = config.appRef.injector.get(DOCUMENT);
      let html = serializeDocument(doc);
      let meteorApp = config.appRef.injector.get(MeteorApp);
      let logger = config.appRef.injector.get(Logger);
      let size = (html.length * 2 / 1024) >> 0;
      logger.debug(`page has been serialized (size: ${size}kb)`);
      if (size > options.pageSizeLimitKb) {
        logger.warn(`page (size: ${size}kb) exceeded limit size ${options.pageSizeLimitKb}kb`);
      }
      meteorApp.onStable(() => {
        config.appRef.dispose();
        logger.debug('page has been disposed');
      });
      return html;
    })
    .then(html => future.return(html))
    .catch(err => {
      future.throw(err);
    });

    return future.wait();
  }

  getAppProviders(options?: ServerOptions): Providers {
    return [
      ...NODE_PLATFORM_PIPES,
      ...NODE_HTTP_PROVIDERS,
      ...METEOR_PROVIDERS,
      ...NODE_ROUTER_PROVIDERS,
      ...NODE_LOCATION_PROVIDERS,
      provide(ORIGIN_URL, { useValue: global.process.env.ROOT_URL }),
      provide(BASE_URL, { useValue: Router.baseUrl }),
      provide(XHR, {
        useFactory: (ngZone) => {
          return new MeteorXHRImpl(ngZone);
        },
        deps: [NgZone]
      }),
      provide(Logger, { useValue: new Logger(Router.pathDef, options.debug) }),
      provide(REQUEST_URL, { useValue: Router.reqUrl })
    ];
  }

  private bootstrap(component: Type,
                    providers: Providers,
                    options: ServerOptions) {
    let doc = this.createDoc(component);
    let customProviders = buildNodeAppProviders(doc, this.getAppProviders(options));
    customProviders = isPresent(providers) ? [...providers, ...customProviders]
      : customProviders;
    let bootstrapping = MeteorApp.bootstrap(component, buildNodeProviders(), customProviders);
    return bootstrapping.then(compRef => ({
      appRef: compRef.injector.get(ApplicationRef),
      compRef
    }));
  }

  private createDoc(component: Type) {
    let selector = new DirectiveResolver().resolve(component).selector;
    let serverDoc = DOM.createHtmlDocument();
    let el = DOM.createElement(selector);
    DOM.appendChild(serverDoc.body, el);
    return serverDoc;
  }
}
