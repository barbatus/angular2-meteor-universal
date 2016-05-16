'use strict';

import {Meteor} from 'meteor/meteor';

import {loadTestData} from './test_data';
import './pubs';

Meteor.startup(function() {
  loadTestData();
});
