'use strict';

import {Component} from 'angular2/core';

import {ROUTER_DIRECTIVES} from 'angular2/router';

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

  constructor() {
    super();
    this.subscribe('parties', 'Palo Alto');
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
