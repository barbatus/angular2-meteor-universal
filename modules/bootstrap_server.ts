'use strict';

import {Type} from '@angular/core';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

import {Providers} from 'angular2-meteor';

import {ServerOptions, UniOptions} from './bootstrap';
import ServerRenderer from './server_renderer';

const devMode = assertionsEnabled();

export const serverDefault: ServerOptions = {
  debug: false,
  renderLimitMs: 1000,
  pageSizeLimitKb: 500,
  preboot: {
    start: true,
    // Show spinner and freeze page
    // when any of the events in presets happen.
    freeze: 'spinner',
    // Rerender replay strategy.
    replay: 'rerender',
    // Client app will write to hidden div until bootstrap complete.
    buffer: true,
    uglify: !devMode,
    presets: ['keyPress', 'buttonPress', 'focus']
  }
};

export function bootstrap(component: Type,
                          providers?: Providers,
                          options: UniOptions = {
                            server: serverDefault
                          }): Promise<string> {
  return new Promise((resolve, reject) => {
    const renderer = new ServerRenderer(options.server);
    const html = renderer.render(component, providers);
    resolve(html);
  });
}

export * from './router';
