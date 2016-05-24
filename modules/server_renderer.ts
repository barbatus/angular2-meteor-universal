'use strict';

import './runtime';

import {Providers} from 'angular2-meteor';

import {Router} from './router';

import {Bootloader} from './bootloader';

import {ServerOptions} from './angular_uni';
import {serverDefault} from './angular_uni_server';

export default class ServerRenderer {
  constructor(private options: ServerOptions = {}) {
    this.options = _.defaults(options, serverDefault);
  }

  render(component, providers?: Providers): void {
    let booloader = new Bootloader;
    let html = booloader.serialize(component, providers, this.options);
    Router.render(html);
  }
}
