'use strict';

import {Type} from '@angular/core';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

import {Providers} from 'angular2-meteor';

import {ServerOptions, UniOptions} from './angular_uni';
import ServerRenderer from './server_renderer';

const devMode = assertionsEnabled();

export const serverDefault: ServerOptions = {
  prebootStart: false,
  debug: false,
  uglify: !devMode,
  renderLimitMs: 1000,
  pageSizeLimitKb: 500
};

export class AngularUni implements AngularUni {
  static render(component: Type,
                providers?: Providers,
                options: UniOptions = {
                  server: serverDefault
                }) {
    const renderer = new ServerRenderer(options.server);
    renderer.render(component, providers);
  }
}

export * from './router';
