'use strict';

import {bootstrap, Router} from 'angular2-meteor-universal';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {Socially} from './parties/app';

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
    bootstrap(Socially, partiesProviders);
  }
});
