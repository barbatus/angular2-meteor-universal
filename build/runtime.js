'use strict';
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Fiber = require('fibers');
var MeteorPromise = require('meteor-promise');
MeteorPromise.Fiber = Fiber;
var nativeThen = MeteorPromise.prototype.then;
require('angular2-universal-polyfills/dist/zone-node');
// Zone-aware Meteor promise.
MeteorPromise.prototype.then = function (onResolve, onReject) {
    var _this = this;
    return Zone.current.run(function () {
        return nativeThen.call(_this, onResolve, onReject);
    });
};
global.Promise = MeteorPromise;
exports.Promise = MeteorPromise;
function waitRender(appRef, maxZoneTurns) {
    var ngZone = appRef.injector.get(core_1.NgZone);
    var http = appRef.injector.get(http_1.Http, http_1.Http);
    return new exports.Promise(function (resolve) {
        ngZone.runOutsideAngular(function () {
            var checkAmount = 0;
            var checkCount = 0;
            function checkStable() {
                // we setTimeout 10 after the first 20 turns
                checkCount++;
                if (checkCount === maxZoneTurns) {
                    console.warn('\nWARNING: your application is taking longer than ' + maxZoneTurns + ' Zone turns. \n');
                    return resolve();
                }
                if (checkCount === 20) {
                    checkAmount = 10;
                }
                setTimeout(function () {
                    if (ngZone.hasPendingMicrotasks) {
                        return checkStable();
                    }
                    if (ngZone.hasPendingMacrotasks) {
                        return checkStable();
                    }
                    if (http && http._async > 0) {
                        return checkStable();
                    }
                    if (ngZone._isStable) {
                        return resolve();
                    }
                    return checkStable();
                }, checkAmount);
            }
            return checkStable();
        });
    });
}
exports.waitRender = waitRender;
;
