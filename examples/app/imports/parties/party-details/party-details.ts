'use strict';

import {Component} from '@angular/core';

import {RouteParams} from '@angular/router-deprecated';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from '../../../parties';

@Component({
  selector: 'party-details',
  templateUrl: '/imports/parties/party-details/party-details.html'
})
export class PartyDetailsCmp extends MeteorComponent {
  party: Party;

  constructor(routeParams: RouteParams) {
    super();
    var partyId = routeParams.get('partyId');
    this.subscribe('party', partyId, () => {
      this.party = Parties.findOne(partyId);
    });
  }
}
