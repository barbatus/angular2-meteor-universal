'use strict';

import {Router} from './router';

import {Bootloader} from './bootloader';

export class ServerRenderer {
  static render(component, providers?, customOptions?) {
    let booloader = new Bootloader;
    booloader.serialize(component)
      .then(html => {
        Router.render(html);
        console.log('rendered');
      }).await();
  }
}
