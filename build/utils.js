'use strict';
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var directive_resolver_1 = require('@angular/compiler/src/directive_resolver');
var angular2_meteor_1 = require('angular2-meteor');
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
    var logger = compRef.injector.get(logger_1.Logger);
    var meteorApp = compRef.injector.get(angular2_meteor_1.MeteorApp);
    var time = logger.newTimeAssert();
    return new Promise(function (resolve) {
        ngZone.runOutsideAngular(function () {
            waitRouter(compRef).then(function () {
                var waitHandler;
                // TODO: convert onStable to EventEmitter
                meteorApp.onStable(function () {
                    if (waitHandler) {
                        time.assertStable();
                        clearResolveTimeout(waitHandler);
                        waitHandler = null;
                        resolve(true);
                    }
                });
                waitHandler = setTimeout(function () {
                    time.assertNotStable();
                    waitHandler = null;
                    resolve(false);
                }, waitMs);
            });
        });
    });
}
exports.waitRender = waitRender;
;
function resolve(component) {
    var elem = new directive_resolver_1.DirectiveResolver().resolve(component);
    return elem && elem.selector;
}
exports.resolve = resolve;
