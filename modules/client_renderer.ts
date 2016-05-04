'use strict';

import {Type, Provider, provide} from 'angular2/core';
import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';
import {APP_BASE_HREF} from 'angular2/platform/common';
import {PromiseQ} from 'angular2-meteor';
import {Meteor} from 'meteor/meteor';

import {Router} from './router';

export function bootstrap(appComponentType: any, providers: Array<Type | Provider | any[]> = null) {
  providers = (providers || []).concat(
    provide(APP_BASE_HREF, { useValue: Router.baseUrl }));

  Preboot.start();
  Meteor.defer(() => {
    Meteor.startup(() => {
      origBoot(appComponentType, providers).then(comprRef => {
        PromiseQ.onAll(() => {
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

export class ClientRenderer {
  static render(component, providers?) {
    bootstrap(component, providers);
  }
}
