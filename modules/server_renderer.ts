'use strict';

import 'angular2-meteor-polyfills';

import './runtime';

import {Providers} from 'angular2-meteor';

import {Router} from './router';

import {Bootloader} from './bootloader';

import {ServerOptions} from './bootstrap';
import {serverDefault} from './bootstrap_server';

export default class ServerRenderer {
  constructor(private options: ServerOptions = {}) {
    this.options = options;
    _.defaults(this.options, serverDefault);
    _.defaults(this.options.preboot, serverDefault.preboot);
  }

  render(component, providers?: Providers): string {
    let booloader = new Bootloader;
    let html = booloader.serialize(component, providers, this.options);
    Router.render(html);
    return html;
  }
}
