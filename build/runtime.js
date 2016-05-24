'use strict';
var Fiber = require('fibers');
var fiber_pool_1 = require('meteor-promise/fiber_pool');
var Promise = require('promise');
Promise.Fiber = Fiber;
var fiberPool = fiber_pool_1.makePool();
require('zone.js/dist/zone-node');
require('zone.js/dist/long-stack-trace-zone');
// This is probably bad running everything in fibers.
// We only need to make MeteorPromise zone-aware.
var dynamics = null;
function runZoneInFiber(method, context, params) {
    if (!Fiber.current) {
        var result = void 0;
        // Using fibers from MeteorPromise fiber pool.
        return fiberPool.run({
            callback: method,
            context: context,
            args: params,
            dynamics: dynamics
        }, Promise).then(function (result) { return result; });
    }
    return method.apply(context, params);
}
var ZP = Zone['prototype'];
var runTask = ZP.runTask;
ZP.runTask = function (task, applyThis, applyArgs) {
    return runZoneInFiber(runTask, this, [task, applyThis, applyArgs]);
};
var run = ZP.run;
ZP.run = function (callback, applyThis, applyArgs, source) {
    return runZoneInFiber(run, this, [callback, applyThis, applyArgs, source]);
};
var runGuarded = ZP.runGuarded;
ZP.runGuarded = function (callback, applyThis, applyArgs, source) {
    return runZoneInFiber(runGuarded, this, [callback, applyThis, applyArgs, source]);
};
