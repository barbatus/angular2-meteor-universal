'use strict';
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var async_1 = require('@angular/core/src/facade/async');
var lang_1 = require('@angular/core/src/facade/lang');
var angular2_universal_1 = require('angular2-universal');
var logger_1 = require('./logger');
function waitRouter(compRef) {
    var injector = compRef.injector;
    var router = injector.get(router_deprecated_1.Router, router_deprecated_1.Router);
    if (router && router._currentNavigation) {
        return router._currentNavigation.then(function () { return Promise.resolve(compRef); });
    }
    return Promise.resolve(compRef);
}
exports.waitRouter = waitRouter;
function clearResolveTimeout(handler) {
    if (!handler)
        return handler;
    if (handler.cancelFn) {
        handler.cancelFn(handler);
    }
    clearTimeout(handler);
}
;
function waitRender(compRef, waitMs) {
    if (waitMs === void 0) { waitMs = 1000; }
    var ngZone = compRef.injector.get(core_1.NgZone);
    var baseUrl = compRef.injector.get(angular2_universal_1.BASE_URL);
    // Router.reqUrl doesn't work on the server.
    // Check why context is not accessible.
    var time = new logger_1.TimeAssert(baseUrl);
    var zoneSub;
    var tHandler;
    return new Promise(function (resolve) {
        ngZone.runOutsideAngular(function () {
            waitRouter(compRef).then(function () {
                if (!ngZone.hasPendingMacrotasks &&
                    !ngZone.hasPendingMicrotasks) {
                    time.assertStable();
                    ready(true);
                    return;
                }
                function ready(stable) {
                    lang_1.scheduleMicroTask(function () {
                        if (zoneSub) {
                            clearResolveTimeout(tHandler);
                            async_1.ObservableWrapper.dispose(zoneSub);
                        }
                        resolve(stable);
                    });
                }
                zoneSub = async_1.ObservableWrapper.subscribe(ngZone.onStable, function () {
                    if (!ngZone.hasPendingMacrotasks) {
                        time.assertStable();
                        ready(true);
                    }
                });
                if (lang_1.assertionsEnabled()) {
                    tHandler = async_1.TimerWrapper.setTimeout(function () {
                        time.assertNotStable();
                        ready(false);
                    }, waitMs);
                }
            });
        });
    });
}
exports.waitRender = waitRender;
;
