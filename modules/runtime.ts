'use strict';

//import 'es6-shim';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';

const runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
  const Fiber = require('fibers');
  return Fiber(() => {
    return runTask.apply(this, [task, applyThis, applyArgs]);
  }).run();
};
