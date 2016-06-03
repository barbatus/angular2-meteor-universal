'use strict';

import {Type, Provider, provide, ComponentRef} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {scheduleMicroTask, assertionsEnabled} from '@angular/core/src/facade/lang';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';
BrowserDomAdapter.makeCurrent();

import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
const DOM = getDOM();

import {REQUEST_URL, BASE_URL} from 'angular2-universal';

import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';
import {MeteorApp, Providers} from 'angular2-meteor';

import {ClientOptions} from './bootstrap';
import {clientDefault} from './bootstrap_client';
import {Router} from './router';
import {waitRender, waitRouter, resolve} from './utils';

export default class ClientRenderer {
  constructor(private options: ClientOptions = {}) {
    this.options = _.defaults(options, clientDefault);
  }

  render(component: Type, providers?: Providers): Promise<ComponentRef<any>> {
    return bootstrap(component, providers, this.options); 
  }
}

export function bootstrap(component: Type,
                          providers: Providers,
                          options?: ClientOptions): Promise<ComponentRef<any>> {
  providers = (providers || []).concat(
    provide(APP_BASE_HREF, { useValue: Router.baseUrl }),
    provide(BASE_URL, { useValue: Router.baseUrl }));

  let selector = resolve(component);
  if (!DOM.querySelector(document, selector)) {
    return bootstrapClient(component, providers, options);
  }

  return bootstrapPreboot(component, providers, options);
}

function bootstrapPreboot(component: Type,
                          providers: Providers,
                          options?: ClientOptions): Promise<ComponentRef<any>> {
  return new Promise((resolve, reject) => {
    Meteor.startup(() => {
      origBoot(component, providers)
        .then(compRef => {
          return waitRouter(compRef).then(() => compRef);
        })
        .then(compRef => {
          let meteorApp = compRef.injector.get(MeteorApp);
          meteorApp.onRendered(() => {
            Preboot.complete();
            resolve(compRef);
          });
        });
    });
  });
}

function bootstrapClient(component: Type,
                         providers: Providers,
                         options?: ClientOptions): Promise<ComponentRef<any>> {
  let selector = resolve(component);
  let el = DOM.createElement(selector);
  DOM.appendChild(document.body, el);
  return origBoot(component, providers);
}

declare interface PrebootRef {
  start();
  complete();
}

class Preboot {
  private static _prebootRef: PrebootRef;

  static start() {
    this.init();

    if (this._prebootRef) {
      this._prebootRef.start();
    }
  }

  static complete() {
    this.init();

    if (this._prebootRef) {
      this._prebootRef.complete();
    }
  }

  static init() {
    if (!this._prebootRef) {
      this._prebootRef = global['preboot'];
    }
  }
}
