import {AngularUni} from 'angular2-meteor-universal';
import {Todos} from './imports/todo/app';
import {Socially} from './imports/parties/app';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy,
        PathLocationStrategy, APP_BASE_HREF} from 'angular2/router';

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
