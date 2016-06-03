'use strict';

import {Component} from '@angular/core';

import {Control, FormBuilder, ControlGroup, Validators} from '@angular/common';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from '../../../parties';

@Component({
  selector: 'party-form',
  templateUrl: '/imports/parties/party-form/party-form.html'
})
export class PartyForm extends MeteorComponent {
  protected partyForm: ControlGroup;

  constructor() {
    super();

    let fb = new FormBuilder()
    this.partyForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
}
