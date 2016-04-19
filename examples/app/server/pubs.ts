'use strict';

import {Parties} from '../parties';

Meteor.publish('parties', function(location: string) {
  return Parties.find({ location });
});

Meteor.publish('party', function(partyId: string) {
  return Parties.find(partyId);
});
