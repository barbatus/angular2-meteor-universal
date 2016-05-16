import {AngularUni} from 'angular2-meteor-universal';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {Todos} from './imports/todo/app';
import {Socially} from './imports/parties/app';

FlowRouter.route('/todo', {
  action: function(params) {
    AngularUni.render(Todos);
  }
});

FlowRouter.route('/parties', {
  action: function(params) {
    AngularUni.render(Socially, [
      ROUTER_PROVIDERS, provide(LocationStrategy, {
        useClass: PathLocationStrategy
      })]);
  }
});
