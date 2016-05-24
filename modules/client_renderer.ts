'use strict';

import {Type, Provider, provide} from '@angular/core';
import {scheduleMicroTask, assertionsEnabled} from '@angular/core/src/facade/lang';
import {APP_BASE_HREF} from '@angular/common';
import {REQUEST_URL, BASE_URL} from 'angular2-universal';

import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';
import {MeteorApp, Providers} from 'angular2-meteor';

import {ClientOptions} from './angular_uni';
import {clientDefault} from './angular_uni_client';
import {Router} from './router';
import {waitRender, waitRouter} from './utils';

export default class ClientRenderer {
  constructor(private options: ClientOptions = {}) {
    this.options = _.defaults(options, clientDefault);
  }

  render(component, providers?) {
    bootstrap(component, providers, this.options);
  }
}

export function bootstrap(component: Type,
                          providers: Providers,
                          options?: ClientOptions) {
  providers = (providers || []).concat(
    provide(APP_BASE_HREF, { useValue: Router.baseUrl }),
    provide(BASE_URL, { useValue: Router.baseUrl }));

  Preboot.start();
  // Run in a new frame to make sure
  // DOM is updated after the start.
  scheduleMicroTask(() => {
    Meteor.startup(() => {
      origBoot(component, providers)
        .then(compRef => {
          return waitRouter(compRef).then(() => compRef);
        })
        .then(compRef => {
          let meteorApp = compRef.injector.get(MeteorApp);
          meteorApp.onRendered(() => {
            Preboot.complete();
          });
        });
    });
  });
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
