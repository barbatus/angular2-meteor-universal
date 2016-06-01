'use strict';
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var angular2_universal_1 = require('angular2-universal');
var angular2_meteor_auto_bootstrap_1 = require('angular2-meteor-auto-bootstrap');
var angular2_meteor_1 = require('angular2-meteor');
var bootstrap_client_1 = require('./bootstrap_client');
var router_1 = require('./router');
var utils_1 = require('./utils');
var ClientRenderer = (function () {
    function ClientRenderer(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.options = _.defaults(options, bootstrap_client_1.clientDefault);
    }
    ClientRenderer.prototype.render = function (component, providers) {
        return bootstrap(component, providers, this.options);
    };
    return ClientRenderer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientRenderer;
function bootstrap(component, providers, options) {
    providers = (providers || []).concat(core_1.provide(common_1.APP_BASE_HREF, { useValue: router_1.Router.baseUrl }), core_1.provide(angular2_universal_1.BASE_URL, { useValue: router_1.Router.baseUrl }));
    // TODO: give a change to render component here even
    // if server has failed.
    return new Promise(function (resolve, reject) {
        Meteor.startup(function () {
            angular2_meteor_auto_bootstrap_1.bootstrap(component, providers)
                .then(function (compRef) {
                return utils_1.waitRouter(compRef).then(function () { return compRef; });
            })
                .then(function (compRef) {
                var meteorApp = compRef.injector.get(angular2_meteor_1.MeteorApp);
                meteorApp.onRendered(function () {
                    Preboot.complete();
                    resolve(compRef);
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
