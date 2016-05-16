'use strict';

import * as Fiber from 'fibers';
import * as MeteorPromise from 'meteor-promise';
MeteorPromise.Fiber = Fiber;

import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';

function runZoneInFiber(method, context, params) {
  if (!Fiber.current) {
    let result;
    // Using fibers from MeteorPromise fiber pool.
    MeteorPromise.asyncApply.apply(MeteorPromise,
      [method, context, params, true])
      .then(result => result);
    return result;
  }
  return method.apply(context, params);
}

const runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
  return runZoneInFiber(runTask, this, [task, applyThis, applyArgs]);
};

const run = Zone.prototype.run;
Zone.prototype.run = function(callback, applyThis, applyArgs, source) {
  return runZoneInFiber(run, this, [callback, applyThis, applyArgs, source]);
};

const runGuarded = Zone.prototype.runGuarded;
Zone.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {
  return runZoneInFiber(runGuarded, this, [callback, applyThis, applyArgs, source]);
};
