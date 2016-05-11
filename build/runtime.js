'use strict';
//import 'es6-shim';
require('zone.js/dist/zone-node');
require('zone.js/dist/long-stack-trace-zone');
var runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
    var _this = this;
    var Fiber = require('fibers');
    return Fiber(function () {
        return runTask.apply(_this, [task, applyThis, applyArgs]);
    }).run();
};
