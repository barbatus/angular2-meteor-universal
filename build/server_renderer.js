'use strict';
var Fiber = require('fibers');
var MeteorPromise = require('meteor-promise');
MeteorPromise.Fiber = Fiber;
var nativeThen = MeteorPromise.prototype.then;
require('angular2-universal-polyfills/dist/zone-node');
MeteorPromise.prototype.then = nativeThen;
// Zone sets own promise and overrides 'then' in the
// global one (Meteor promise) if any, but we need
// Meteor promise to be within Meteor environment.
// TODO: take a look how to support Zone-aware promise
// that works with fibers.
//global.Promise = Promise;
var angular2_universal_1 = require('angular2-universal');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var compiler_1 = require('angular2/compiler');
var directive_resolver_1 = require('angular2/src/core/linker/directive_resolver');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var angular2_meteor_1 = require('angular2-meteor');
var meteor_xhr_impl_1 = require('./meteor_xhr_impl');
var router_2 = require('./router');
var ServerRenderer = (function () {
    function ServerRenderer() {
    }
    ServerRenderer.render = function (component, providers, customOptions) {
        var options = this.getUniOptions(component, providers, customOptions);
        var bootloader = angular2_universal_1.Bootloader.create(options);
        var serialize = bootloader.serializeApplication();
        var html = null;
        new MeteorPromise(function (resolve, reject) {
            serialize.then(function (result) {
                html = result;
                resolve();
            }, reject);
        }).await();
        router_2.Router.render(html);
        bootloader.dispose();
        return html;
    };
    ServerRenderer.createServerDoc = function (component) {
        var selector = new directive_resolver_1.DirectiveResolver().resolve(component).selector;
        var serverDoc = dom_adapter_1.DOM.createHtmlDocument();
        var el = dom_adapter_1.DOM.createElement(selector);
        dom_adapter_1.DOM.appendChild(serverDoc.body, el);
        return serverDoc;
    };
    ServerRenderer.getUniOptions = function (component, providers, customOptions) {
        providers = providers || [];
        customOptions = customOptions || {};
        var layoutUrl = customOptions.layout;
        var serverDoc = null;
        if (!layoutUrl) {
            serverDoc = this.createServerDoc(component);
        }
        var options = {
            buildClientScripts: true,
            providers: [
                new core_1.Provider(compiler_1.XHR, {
                    useFactory: function (ngZone) {
                        return new meteor_xhr_impl_1.MeteorXHRImpl(ngZone);
                    },
                    deps: [core_1.NgZone]
                }),
                angular2_universal_1.NODE_PLATFORM_PIPES,
                router_1.ROUTER_PROVIDERS,
                angular2_universal_1.NODE_ROUTER_PROVIDERS,
                angular2_universal_1.NODE_HTTP_PROVIDERS,
                angular2_universal_1.NODE_LOCATION_PROVIDERS,
                angular2_meteor_1.METEOR_PROVIDERS,
                core_1.provide(angular2_universal_1.ORIGIN_URL, { useValue: global.process.env.ROOT_URL }),
                router_2.Router.baseHrefProvider,
                core_1.provide(angular2_universal_1.REQUEST_URL, { useValue: router_2.Router.reqUrl }),
            ],
            template: serverDoc,
            preboot: {
                start: false,
                debug: true,
                uglify: false
            },
            directives: [component]
        };
        return options;
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
