import {AngularUni, Router} from 'angular2-meteor-universal';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {Todos} from './imports/todo/app';
import {Socially} from './imports/parties/app';

Router.route('/todo', {
  action: function(params) {
    AngularUni.render(Todos, [], {server: { debug: true }});
  }
});

const partiesProviders = [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {
    useClass: PathLocationStrategy
  })];

const parties = Router.group({
  prefix: '/parties'
});

parties.routes(['/', '/party/:partyId'], {
  action: function(params) {
    AngularUni.render(Socially, partiesProviders, {server: { debug: true }});
  }
});
