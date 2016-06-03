'use strict';

import {Component} from '@angular/core';

import {Control} from '@angular/common';

import {PartyForm as PartyFormBase} from '../../../imports/parties/party-form/party-form';

import {Parties} from '../../../parties';

@Component({
  selector: 'party-form',
  templateUrl: '/imports/parties/party-form/party-form.html'
})
export class PartyForm extends PartyFormBase {
  add(event) {
    event.preventDefault();

    let party: Party = this.partyForm.value;

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
