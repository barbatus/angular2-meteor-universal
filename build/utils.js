'use strict';
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var lang_1 = require('@angular/core/src/facade/lang');
var angular2_universal_1 = require('angular2-universal');
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
var TimeAssert = (function () {
    function TimeAssert(reqUrl) {
        this.start = Date.now();
        this.reqUrl = reqUrl;
    }
    TimeAssert.prototype.assertStable = function () {
        if (lang_1.assertionsEnabled()) {
            var time = Date.now() - this.start;
            console.log(this.reqUrl + " is stable after " + time + "ms");
        }
    };
    TimeAssert.prototype.assertNotStable = function () {
        if (lang_1.assertionsEnabled()) {
            var time = Date.now() - this.start;
            console.log(this.reqUrl + " is not stable after " + time + "ms");
        }
    };
    return TimeAssert;
}());
function waitRender(compRef, waitMs) {
    if (waitMs === void 0) { waitMs = 1000; }
    var ngZone = compRef.injector.get(core_1.NgZone);
    var http = compRef.injector.get(http_1.Http, http_1.Http);
    // TODO: implement own class similar to testability.
    var testability = compRef.injector.get(core_1.Testability, null);
    var baseUrl = compRef.injector.get(angular2_universal_1.BASE_URL);
    // Router.reqUrl doesn't work on the server.
    // Check why context is not accessible.
    var time = new TimeAssert(baseUrl);
    return new Promise(function (resolve) {
        ngZone.runOutsideAngular(function () {
            waitRouter(compRef).then(function () {
                var waitHandler;
                testability.whenStable(function () {
                    time.assertStable();
                    testability._callbacks.length = 0;
                    clearResolveTimeout(waitHandler);
                    resolve(true);
                });
                if (lang_1.assertionsEnabled()) {
                    waitHandler = setTimeout(function () {
                        time.assertNotStable();
                        testability._callbacks.length = 0;
                        resolve(false);
                    }, waitMs);
                }
            });
        });
    });
}
exports.waitRender = waitRender;
;
