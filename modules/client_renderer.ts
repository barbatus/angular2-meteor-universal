'use strict';

import {Type, Provider} from 'angular2/core';
import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';
import {PromiseQueue} from 'angular2-meteor';

export function bootstrap(appComponentType: any,
  providers: Array<Type | Provider | any[]> = null) {
  if (preboot) preboot.start();

  Meteor.defer(() => {
    Meteor.startup(() => {
      origBoot(appComponentType, providers).then(comprRef => {
        PromiseQueue.onResolve(() => {
          if (preboot) preboot.complete();
        });
      });
    });
  });
}

export class ClientRenderer {
  static render(component, providers) {
    bootstrap(component, providers);
  }
}
