'use strict';

import {bootstrap, Router} from 'angular2-meteor-universal';

import {Todos} from './imports/todo/app';

Router.route('/todo', {
  action: function(params) {
    bootstrap(Todos, [], {server: { debug: true }});
  }
});
