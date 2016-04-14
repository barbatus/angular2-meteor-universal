'use strict';

import {Type} from 'angular2/core';

export class AngularUni {
  static render(component: Type) {
    const renderer = AngularUni.getRenderer();
    renderer.render(component);
  }

  static getRenderer() {
    if (Meteor.isServer) {
      return require('./server_renderer').ServerRenderer;
    }
    return require('./client_renderer').ClientRenderer;
  }
}
