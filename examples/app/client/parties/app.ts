'use strict';

import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

import {PartiesCmp} from './parties/parties';

import {PartyDetailsCmp} from '../../imports/parties/party-details/party-details';

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
