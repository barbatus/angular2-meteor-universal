'use strict';

import {bootstrap, Router} from 'angular2-meteor-universal';

import {Socially} from '../imports/parties/app';

const parties = Router.group({
  prefix: '/parties'
});

parties.routes(['/', '/party/:partyId'], {
  action: function(params) {
    bootstrap(Socially, [], {server: { debug: true }});
  }
});
