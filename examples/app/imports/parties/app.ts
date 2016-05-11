'use strict';

import {Component, provide, enableProdMode} from '@angular/core';

import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

// import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';

import './parties/parties.ts';

import {PartiesCmp} from './parties/parties';

import './party-details/party-details.ts';

import {PartyDetailsCmp} from './party-details/party-details';

@Component({
  selector: 'socially',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES, PartiesCmp]
})
@RouteConfig([
  {path: '/', name: 'PartiesList', component: PartiesCmp},
  {path: '/party/:partyId', name: 'PartyDetails', component: PartyDetailsCmp}
])
export class Socially {}
