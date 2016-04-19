'use strict';

import {loadTestData} from './test_data';
import './pubs';

Meteor.startup(function() {
  loadTestData();
});
