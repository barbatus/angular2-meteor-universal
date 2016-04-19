'use strict';

import {Type, Provider} from 'angular2/core';
import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';
import {PromiseQueue} from 'angular2-meteor';

import {Router} from './router';

export function bootstrap(appComponentType: any, providers: Array<Type | Provider | any[]> = null) {
  providers = (providers || []).concat(Router.baseHrefProvider);

  Preboot.start();
  Meteor.defer(() => {
    Meteor.startup(() => {
      origBoot(appComponentType, providers).then(comprRef => {
        PromiseQueue.onResolve(() => {
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
