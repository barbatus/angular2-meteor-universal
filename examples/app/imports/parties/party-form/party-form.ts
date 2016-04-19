'use strict';

import {Component} from 'angular2/core';

import {Control, FormBuilder, ControlGroup, Validators} from 'angular2/common';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from '../../../parties';

@Component({
  selector: 'party-form',
  templateUrl: 'imports/parties/templates/party-form.html'
})
export class PartyForm extends MeteorComponent {
  partyForm: ControlGroup;

  constructor() {
    super();

    var fb = new FormBuilder()
    this.partyForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  add(event) {
    event.preventDefault();

    var party: Party = this.partyForm.value;

    if (this.partyForm.valid) {
      Parties.insert({
        name: party.name,
        description: party.description,
        location: party.location
      });

      (<Control>this.partyForm.controls['name']).updateValue('');
      (<Control>this.partyForm.controls['description']).updateValue('');
      (<Control>this.partyForm.controls['location']).updateValue('');
    } else {
      alert('Form is not valid');
    }
  }
}
