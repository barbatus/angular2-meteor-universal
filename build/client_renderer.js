'use strict';
var angular2_meteor_auto_bootstrap_1 = require('angular2-meteor-auto-bootstrap');
var angular2_meteor_1 = require('angular2-meteor');
var router_1 = require('./router');
function bootstrap(appComponentType, providers) {
    if (providers === void 0) { providers = null; }
    providers = (providers || []).concat(router_1.Router.baseHrefProvider);
    Preboot.start();
    Meteor.defer(function () {
        Meteor.startup(function () {
            angular2_meteor_auto_bootstrap_1.bootstrap(appComponentType, providers).then(function (comprRef) {
                angular2_meteor_1.PromiseQ.onAll(function () {
                    Preboot.complete();
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
