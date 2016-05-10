'use strict';

import {Component, NgZone} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import '../party-form/party-form.ts';

import {PartyForm} from '../party-form/party-form';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from '../../../parties';

@Component({
  selector: 'parties',
  templateUrl: 'imports/parties/templates/parties.html',
  directives: [ROUTER_DIRECTIVES, PartyForm]
})
export class PartiesCmp extends MeteorComponent {
  parties: Mongo.Cursor<Party>;
  location: ReactiveVar<String>;

  constructor(ngZone: NgZone) {
    super();

    console.log('Subscribe');
    this.subscribe('parties', 'Palo Alto', () => {
      console.log('Data is received');
    });
    this.location = new ReactiveVar('Palo Alto');

    this.autorun(() => {
      var selector = { location: this.location.get() };
      this.parties = Parties.find(selector);
    }, true);
  }

  searchLocation(location) {
    this.subscribe('parties', location, () => {
      if (!this.parties.count()) {
        alert('Nothing found');
      }
    });
    this.location.set(location);
  }
}
