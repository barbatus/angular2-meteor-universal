'use strict';

import {Mongo} from 'meteor/mongo';

export const Parties = new Mongo.Collection<Party>('parties');

Parties.allow({
  insert: function(userId, party) {
    return true;
  },
  update: function(userId, party, fields, modifier) {
    return true;
  },
  remove: function(userId, party) {
    return true;
  }
});
