'use strict';
require('angular2-universal-polyfills/dist/zone-node');
var runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
    var _this = this;
    var Fiber = require('fibers');
    return Fiber(function () {
        return runTask.apply(_this, [task, applyThis, applyArgs]);
    }).run();
};
