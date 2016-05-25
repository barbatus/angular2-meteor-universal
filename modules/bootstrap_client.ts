'use strict';

import {Type, ComponentRef} from '@angular/core';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

import {Providers} from 'angular2-meteor';

import {ClientOptions, UniOptions} from './bootstrap';
import ClientRenderer from './client_renderer';

export const clientDefault: ClientOptions = {
  debug: false
};

export function bootstrap(component: Type,
                          providers?: Providers,
                          options: UniOptions = {
                            client: clientDefault
                          }): Promise<ComponentRef<any>> {
  return new Promise((resolve, reject) => {
    const renderer = new ClientRenderer(options.client);
    renderer.render(component, providers);
  });
}

export * from './router';
