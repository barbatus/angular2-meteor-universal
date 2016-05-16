'use strict';
var Fiber = require('fibers');
var MeteorPromise = require('meteor-promise');
MeteorPromise.Fiber = Fiber;
require('zone.js/dist/zone-node');
require('zone.js/dist/long-stack-trace-zone');
function runZoneInFiber(method, context, params) {
    if (!Fiber.current) {
        var result = void 0;
        // Using fibers from MeteorPromise fiber pool.
        MeteorPromise.asyncApply.apply(MeteorPromise, [method, context, params, true])
            .then(function (result) { return result; });
        return result;
    }
    return method.apply(context, params);
}
var runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
    return runZoneInFiber(runTask, this, [task, applyThis, applyArgs]);
};
var run = Zone.prototype.run;
Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
    return runZoneInFiber(run, this, [callback, applyThis, applyArgs, source]);
};
var runGuarded = Zone.prototype.runGuarded;
Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
    return runZoneInFiber(runGuarded, this, [callback, applyThis, applyArgs, source]);
};
