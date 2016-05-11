'use strict';
var core_1 = require('@angular/core');
var lang_1 = require('@angular/core/src/facade/lang');
var common_1 = require('@angular/common');
var angular2_meteor_auto_bootstrap_1 = require('angular2-meteor-auto-bootstrap');
var angular2_meteor_1 = require('angular2-meteor');
var angular2_universal_1 = require('angular2-universal');
var router_1 = require('./router');
var utils_1 = require('./utils');
function bootstrap(appComponentType, providers) {
    if (providers === void 0) { providers = null; }
    providers = (providers || []).concat(core_1.provide(common_1.APP_BASE_HREF, { useValue: router_1.Router.baseUrl }), core_1.provide(angular2_universal_1.BASE_URL, { useValue: router_1.Router.baseUrl }));
    Preboot.start();
    Meteor.defer(function () {
        Meteor.startup(function () {
            angular2_meteor_auto_bootstrap_1.bootstrap(appComponentType, providers)
                .then(function (compRef) {
                return utils_1.waitRender(compRef).then(function () { return compRef; });
            })
                .then(function (compRef) {
                angular2_meteor_1.PromiseQ.onAll(function () {
                    lang_1.scheduleMicroTask(function () {
                        Preboot.complete();
                    });
                });
            });
        });
    });
}
exports.bootstrap = bootstrap;
var Preboot = (function () {
    function Preboot() {
    }
    Preboot.start = function () {
        this.init();
        if (this._prebootRef) {
            this._prebootRef.start();
        }
    };
    Preboot.complete = function () {
        this.init();
        if (this._prebootRef) {
            this._prebootRef.complete();
        }
    };
    Preboot.init = function () {
        if (!this._prebootRef) {
            this._prebootRef = global['preboot'];
        }
    };
    return Preboot;
}());
var ClientRenderer = (function () {
    function ClientRenderer() {
    }
    ClientRenderer.render = function (component, providers) {
        bootstrap(component, providers);
    };
    return ClientRenderer;
}());
exports.ClientRenderer = ClientRenderer;
