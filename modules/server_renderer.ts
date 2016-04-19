'use strict';

import * as Fiber from 'fibers';
import * as Promise from 'meteor-promise';
Promise.Fiber = Fiber;
const nativeThen = Promise.prototype.then;
import 'angular2-universal-polyfills/dist/zone-node';
// Zone sets own promise and overrides 'then' in the
// global one (Meteor promise) if any, but we need
// Meteor promise to be within Meteor environment.
// TODO: take a look how to support Zone-aware promise
// that works with fibers.
Promise.prototype.then = nativeThen;
global.Promise = Promise;

import {
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  NODE_PLATFORM_PIPES,
  REQUEST_URL,
  BASE_URL,
  queryParamsToBoolean,
  Bootloader,
  NodePlatformLocation,
  ORIGIN_URL
} from 'angular2-universal';

import {provide, Provider, NgZone, Type} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF,
  LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {XHR} from 'angular2/compiler';
import {DirectiveResolver} from 'angular2/src/core/linker/directive_resolver';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {METEOR_PROVIDERS} from 'angular2-meteor';
import {MeteorXHRImpl} from './meteor_xhr_impl';
import {Router} from './router';

export class ServerRenderer {
  static render(component, providers?, customOptions?) {
    let options = this.getUniOptions(
      component, providers, customOptions);

    let bootloader = Bootloader.create(options);
    let serialize = bootloader.serializeApplication();
    let html = null;
    new Promise(function(resolve, reject) {
      serialize.then(result => {
        html = result;
        resolve();
      }, reject);
    }).await();

    Router.render(html);

    return html;
  }

  private static createServerDoc(component: Type) {
    let selector = new DirectiveResolver().resolve(component).selector;
    let serverDoc = DOM.createHtmlDocument();
    let el = DOM.createElement(selector);
    DOM.appendChild(serverDoc.body, el);
    return serverDoc;
  }

  private static getUniOptions(component, providers?, customOptions?) {
    providers = providers || [];
    customOptions = customOptions || {};

    const layoutUrl = customOptions.layout;
    let serverDoc = null;
    if (!layoutUrl) {
      serverDoc = this.createServerDoc(component);
    }

    let options = {
      buildClientScripts: true,
      providers: [
        new Provider(XHR, {
          useFactory: (ngZone) => {
            return new MeteorXHRImpl(ngZone);
          },
          deps: [NgZone]
        }),
        NODE_PLATFORM_PIPES,
        NODE_ROUTER_PROVIDERS,
        NODE_HTTP_PROVIDERS,
        METEOR_PROVIDERS,
        provide(ORIGIN_URL, { useValue: global.process.env.ENV_VARIABLE }),
        Router.baseHrefProvider,
        provide(REQUEST_URL, { useValue: Router.reqUrl }),
        provide(LocationStrategy, {
          useClass: PathLocationStrategy
        }),
        //providers
      ],
      template: serverDoc,
      preboot: {
        start: false,
        debug: true,
        uglify: false
      },
      directives: [component]
    };

    return options;
  }
}
