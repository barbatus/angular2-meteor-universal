'use strict';

import * as Fiber from 'fibers';
import * as MeteorPromise from 'meteor-promise';
MeteorPromise.Fiber = Fiber;

import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';

const runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
  if (!Fiber.current) {
    let result;
    // Using fibers from MeteorPromise fiber pool.
    MeteorPromise.asyncApply.apply(MeteorPromise,
      [runTask, this, [task, applyThis, applyArgs], true])
        .then(result => result);
    return result;
  }
  return runTask.apply(this, [task, applyThis, applyArgs]);
};
