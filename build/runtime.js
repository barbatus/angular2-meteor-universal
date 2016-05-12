'use strict';
var Fiber = require('fibers');
var MeteorPromise = require('meteor-promise');
MeteorPromise.Fiber = Fiber;
require('zone.js/dist/zone-node');
require('zone.js/dist/long-stack-trace-zone');
var runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
    if (!Fiber.current) {
        var result = void 0;
        MeteorPromise.asyncApply.apply(MeteorPromise, [runTask, this, [task, applyThis, applyArgs], true])
            .then(function (result) { return result; });
        return result;
    }
    return runTask.apply(this, [task, applyThis, applyArgs]);
};
