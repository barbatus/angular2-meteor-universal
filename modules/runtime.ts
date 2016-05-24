'use strict';

import * as Fiber from 'fibers';
import {makePool} from 'meteor-promise/fiber_pool';
import * as Promise from 'promise';
Promise.Fiber = Fiber;
const fiberPool = makePool();

import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';

// This is probably bad running everything in fibers.
// We only need to make MeteorPromise zone-aware.
let dynamics = null;
function runZoneInFiber(method, context, params) {
  if (!Fiber.current) {
    let result;
    // Using fibers from MeteorPromise fiber pool.
    return fiberPool.run({
      callback: method,
      context: context,
      args: params,
      dynamics: dynamics
    }, Promise).then(result => result);
  }
  return method.apply(context, params);
}

let ZP = Zone['prototype'];
const runTask = ZP.runTask;
ZP.runTask = function(task: Task, applyThis?: any, applyArgs?: any): any {
  return runZoneInFiber(runTask, this, [task, applyThis, applyArgs]);
};

const run = ZP.run;
ZP.run = function(callback: Function, applyThis?: any,
                  applyArgs?: any[], source?: string): any {
  return runZoneInFiber(run, this, [callback, applyThis, applyArgs, source]);
};

const runGuarded = ZP.runGuarded;
ZP.runGuarded = function(callback: Function, applyThis?: any,
                         applyArgs?: any[], source?: string): any {
  return runZoneInFiber(runGuarded, this, [callback, applyThis, applyArgs, source]);
};
