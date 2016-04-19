'use strict';

import {Component} from 'angular2/core';

import {RouteParams} from 'angular2/router';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from '../../../parties';

@Component({
  selector: 'party-details',
  templateUrl: 'imports/parties/templates/party-details.html'
})
export class PartyDetailsCmp extends MeteorComponent {
  party: Party;

  constructor(routeParams: RouteParams) {
    super();
    var partyId = routeParams.get('partyId');
    this.subscribe('party', partyId, () => {
      this.party = Parties.findOne(partyId);
    }, true);
  }
}
