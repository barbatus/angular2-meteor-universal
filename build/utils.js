'use strict';
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var async_1 = require('@angular/core/src/facade/async');
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
    if (waitMs === void 0) { waitMs = 500; }
    var ngZone = compRef.injector.get(core_1.NgZone);
    var http = compRef.injector.get(http_1.Http, http_1.Http);
    return new Promise(function (resolve) {
        ngZone.runOutsideAngular(function () {
            waitRouter(compRef).then(function () {
                if (!ngZone.hasPendingMicrotasks && !ngZone.hasPendingMacrotasks) {
                    resolve(true);
                    return;
                }
                var waitHandler;
                var sub = async_1.ObservableWrapper.subscribe(ngZone.onStable, function () {
                    clearResolveTimeout(waitHandler);
                    waitHandler = null;
                    console.log('onStable');
                    async_1.ObservableWrapper.dispose(sub);
                    resolve(true);
                });
                if (waitMs !== Number.MAX_VALUE) {
                    waitHandler = setTimeout(function () {
                        console.log('App takes more then 500ms to render');
                        async_1.ObservableWrapper.dispose(sub);
                        resolve(false);
                    }, waitMs);
                }
            });
        });
    });
}
exports.waitRender = waitRender;
;
