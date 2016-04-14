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
  Bootloader
} from 'angular2-universal';

import {provide, Provider, NgZone} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {XHR} from 'angular2/compiler';
import {METEOR_PROVIDERS} from 'angular2-meteor';
import {MeteorXHRImpl} from './meteor_xhr_impl';

export class ServerRenderer {
  static render(component, providers) {
    let url = this.getCurrentUrl();
    providers = providers || [];
    let options = this.getUniOptions(component, providers, '/', url);

    let bootloader = Bootloader.create(options);
    let serialize = bootloader.serializeApplication();
    let html = null;
    new Promise(function(resolve, reject) {
      serialize.then(result => {
        html = result;
        resolve();
      }, reject);
    }).await();

    let router = this.getRouter();
    if (router) {
      var ssrContext = router.ssrContext.get();
      ssrContext.setHtml(html);
    }

    return html;
  }

  private static getRouter() {
    const flowSSR = Package['kadira:flow-router-ssr'];
    return flowSSR && flowSSR.FlowRouter;
  }

  private static getCurrentUrl() {
    return '/';
  }

  private static getUniOptions(component, providers, baseUrl?: string, url?: string) {
    let options = {
      buildClientScripts: true,
      providers: [
        new Provider(XHR, {
          useFactory: (ngZone) => {
            return new MeteorXHRImpl(ngZone);
          },
          deps: [NgZone]
        })
      ],
      componentProviders: [
        provide(APP_BASE_HREF, { useValue: baseUrl }),
        provide(REQUEST_URL, { useValue: url }),
        ROUTER_PROVIDERS,
        NODE_ROUTER_PROVIDERS,
        METEOR_PROVIDERS,
        providers
      ],
      template: '<app />',
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
