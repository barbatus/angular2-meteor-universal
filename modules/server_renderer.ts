'use strict';

import {Router} from './router';

import {Bootloader} from './bootloader';

export class ServerRenderer {
  static render(component, providers?, customOptions?) {
    console.log('Server rendering');
    let booloader = new Bootloader;
    let html = booloader.serialize(component);
    Router.render(html);
  }
}
