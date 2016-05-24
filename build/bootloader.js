'use strict';
var core_1 = require('@angular/core');
core_1.NgZone.assertNotInAngularZone = function () { };
var compiler_1 = require('@angular/compiler');
var directive_resolver_1 = require('@angular/compiler/src/directive_resolver');
var platform_browser_1 = require('@angular/platform-browser');
var platform_server_1 = require('@angular/platform-server');
platform_server_1.Parse5DomAdapter.makeCurrent(); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var lang_1 = require('@angular/core/src/facade/lang');
var Future = require('fibers/future');
var angular2_universal_1 = require('angular2-universal');
var angular2_meteor_1 = require('angular2-meteor');
var utils_1 = require('./utils');
var logger_1 = require('./logger');
var router_1 = require('./router');
var meteor_xhr_impl_1 = require('./meteor_xhr_impl');
var Bootloader = (function () {
    function Bootloader() {
    }
    Bootloader.prototype.serialize = function (component, providers, options) {
        var future = new Future;
        this.bootstrap(component, providers, options).then(function (config) {
            return utils_1.waitRender(config.compRef, options.renderLimitMs)
                .then(function (stable) { return config; });
        })
            .then(function (config) {
            var prebootCode = angular2_universal_1.createPrebootCode(component, {
                start: options.prebootStart,
                debug: options.debug,
                uglify: options.uglify
            });
            return prebootCode
                .then(function (code) {
                var el = config.compRef.location.nativeElement;
                var script = angular2_universal_1.parseFragment(code);
                var prebootEl = DOM.createElement('div');
                DOM.setInnerHTML(prebootEl, code);
                DOM.insertAfter(el, prebootEl);
                var logger = config.appRef.injector.get(logger_1.Logger);
                logger.debug('preboot source code rendered');
                return config;
            });
        })
            .then(function (config) {
            var document = config.appRef.injector.get(platform_browser_1.DOCUMENT);
            var html = angular2_universal_1.serializeDocument(document);
            var meteorApp = config.appRef.injector.get(angular2_meteor_1.MeteorApp);
            var logger = config.appRef.injector.get(logger_1.Logger);
            var size = (html.length * 2 / 1024) >> 0;
            logger.debug("page has been serialized (size: " + size + "kb)");
            if (size > options.pageSizeLimitKb) {
                logger.warn("page (size: " + size + "kb) exceeded limit size " + options.pageSizeLimitKb + "kb");
            }
            meteorApp.onStable(function () {
                config.appRef.dispose();
                logger.debug('page has been disposed');
            });
            return html;
        })
            .then(function (html) { return future.return(html); })
            .catch(function (err) {
            future.throw(err);
        });
        return future.wait();
    };
    Bootloader.prototype.getAppProviders = function (options) {
        return angular2_universal_1.NODE_PLATFORM_PIPES.concat(angular2_universal_1.NODE_HTTP_PROVIDERS, angular2_meteor_1.METEOR_PROVIDERS, angular2_universal_1.NODE_ROUTER_PROVIDERS, angular2_universal_1.NODE_LOCATION_PROVIDERS, [
            core_1.provide(angular2_universal_1.ORIGIN_URL, { useValue: global.process.env.ROOT_URL }),
            core_1.provide(angular2_universal_1.BASE_URL, { useValue: router_1.Router.baseUrl }),
            core_1.provide(compiler_1.XHR, {
                useFactory: function (ngZone) {
                    return new meteor_xhr_impl_1.MeteorXHRImpl(ngZone);
                },
                deps: [core_1.NgZone]
            }),
            core_1.provide(logger_1.Logger, { useValue: new logger_1.Logger(router_1.Router.pathDef, options.debug) }),
            core_1.provide(angular2_universal_1.REQUEST_URL, { useValue: router_1.Router.reqUrl })
        ]);
    };
    Bootloader.prototype.bootstrap = function (component, providers, options) {
        var doc = this.createDoc(component);
        var customProviders = angular2_universal_1.buildNodeAppProviders(doc, this.getAppProviders(options));
        customProviders = lang_1.isPresent(providers) ? providers.concat(customProviders)
            : customProviders;
        var bootstrapping = angular2_meteor_1.MeteorApp.bootstrap(component, angular2_universal_1.buildNodeProviders(), customProviders);
        return bootstrapping.then(function (compRef) { return ({
            appRef: compRef.injector.get(core_1.ApplicationRef),
            compRef: compRef
        }); });
    };
    Bootloader.prototype.createDoc = function (component) {
        var selector = new directive_resolver_1.DirectiveResolver().resolve(component).selector;
        var serverDoc = DOM.createHtmlDocument();
        var el = DOM.createElement(selector);
        DOM.appendChild(serverDoc.body, el);
        return serverDoc;
    };
    return Bootloader;
}());
exports.Bootloader = Bootloader;
