'use strict';

import 'angular2-universal-polyfills/dist/zone-node';

const runTask = Zone.prototype.runTask;
Zone.prototype.runTask = function (task, applyThis, applyArgs) {
  const Fiber = require('fibers');
  return Fiber(() => {
    return runTask.apply(this, [task, applyThis, applyArgs]);
  }).run();
};
