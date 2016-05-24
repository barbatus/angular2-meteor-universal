'use strict';

import {Type} from '@angular/core';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

import {Providers} from 'angular2-meteor';

import {ClientOptions, UniOptions} from './angular_uni';
import ClientRenderer from './client_renderer';

export const clientDefault: ClientOptions = {
  debug: false
};

export class AngularUni implements AngularUni {
  static render(component: Type,
                providers?: Providers,
                options: UniOptions = {
                  client: clientDefault
                }) {
    const renderer = new ClientRenderer(options.client);
    renderer.render(component, providers);
  }
}

export * from './router';
