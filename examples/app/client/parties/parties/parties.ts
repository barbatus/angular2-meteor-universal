'use strict';

import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {PartiesCmp as PartiesCmpBase} from '../../../imports/parties/parties/parties';

import {PartyForm} from '../party-form/party-form';

@Component({
  selector: 'parties',
  templateUrl: '/imports/parties/parties/parties.html',
  directives: [ROUTER_DIRECTIVES, PartyForm]
})
export class PartiesCmp extends PartiesCmpBase {
  searchLocation(location) {
    this.subscribe('parties', location, () => {
      if (!this.parties.count()) {
        alert('Nothing found');
      }
    });
    this.location.set(location);
  }
}
