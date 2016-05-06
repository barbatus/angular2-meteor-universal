'use strict';
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var compiler_1 = require('@angular/compiler');
var directive_resolver_1 = require('@angular/compiler/src/directive_resolver');
var platform_browser_1 = require('@angular/platform-browser');
var platform_server_1 = require('@angular/platform-server');
platform_server_1.Parse5DomAdapter.makeCurrent(); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var angular2_universal_1 = require('angular2-universal');
var angular2_meteor_1 = require('angular2-meteor');
var runtime_1 = require('./runtime');
var router_1 = require('./router');
var meteor_xhr_impl_1 = require('./meteor_xhr_impl');
var Bootloader = (function () {
    function Bootloader() {
    }
    Bootloader.prototype.serialize = function (component) {
        var _this = this;
        var maxZoneTurns = 2000;
        return this.bootstrap(component).then(function (config) {
            return runtime_1.waitRender(config.appRef, maxZoneTurns).then(function () { return config; });
        })
            .catch(function (err) {
            _this.handleError('Async Error: ', err);
        })
            .then(function (config) {
            var prebootCode = angular2_universal_1.createPrebootCode(component, {
                start: false,
                debug: true,
                uglify: false
            });
            return prebootCode
                .then(function (code) {
                var el = config.compRef.location.nativeElement;
                var script = angular2_universal_1.parseFragment(code);
                var prebootEl = DOM.createElement('div');
                DOM.setInnerHTML(prebootEl, code);
                DOM.insertAfter(el, prebootEl);
                return config;
            });
        })
            .catch(function (err) {
            _this.handleError('Preboot Error: ', err);
        })
            .then(function (config) {
            var document = config.appRef.injector.get(platform_browser_1.DOCUMENT);
            var rendered = angular2_universal_1.serializeDocument(document);
            config.compRef.destroy();
            config.appRef.dispose();
            return rendered;
        })
            .catch(function (err) {
            _this.handleError('Rendering Error: ', err);
        });
    };
    Object.defineProperty(Bootloader.prototype, "appProviders", {
        get: function () {
            return angular2_universal_1.NODE_PLATFORM_PIPES.concat(angular2_universal_1.NODE_HTTP_PROVIDERS, angular2_meteor_1.METEOR_PROVIDERS, angular2_universal_1.NODE_ROUTER_PROVIDERS, angular2_universal_1.NODE_LOCATION_PROVIDERS, [
                core_1.provide(angular2_universal_1.ORIGIN_URL, { useValue: global.process.env.ROOT_URL }),
                core_1.provide(angular2_universal_1.BASE_URL, { useValue: router_1.Router.baseUrl }),
                new core_1.Provider(compiler_1.XHR, {
                    useFactory: function (ngZone) {
                        return new meteor_xhr_impl_1.MeteorXHRImpl(ngZone);
                    },
                    deps: [core_1.NgZone]
                }),
                core_1.provide(angular2_universal_1.REQUEST_URL, { useValue: router_1.Router.reqUrl })
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bootloader, "platform", {
        get: function () {
            if (!this.platRef) {
                var customProviders = core_1.ReflectiveInjector.resolveAndCreate(angular2_universal_1.buildNodeProviders());
                this.platRef = core_1.createPlatform(customProviders);
            }
            return this.platRef;
        },
        enumerable: true,
        configurable: true
    });
    Bootloader.prototype.application = function (component, providers) {
        var doc = this.createDoc(component);
        var customProviders = angular2_universal_1.buildNodeAppProviders(doc, providers);
        var appinjector = core_1.ReflectiveInjector.resolveAndCreate(customProviders, Bootloader.platform.injector);
        return appinjector;
    };
    Bootloader.prototype.bootstrap = function (component) {
        var appInjector = this.application(component, this.appProviders);
        var appRef = appInjector.get(core_1.ApplicationRef);
        var compRef = angular2_meteor_1.MeteorApp.launch(appRef, function () {
            return core_1.coreLoadAndBootstrap(appInjector, component);
        }).then(this.waitRouter);
        return compRef.then(function (compRef) { return ({ appRef: appRef, compRef: compRef }); });
    };
    Bootloader.prototype.waitRouter = function (compRef) {
        var injector = compRef.injector;
        var router = injector.get(router_deprecated_1.Router, router_deprecated_1.Router);
        if (router && router._currentNavigation) {
            return router._currentNavigation.then(function () { return runtime_1.Promise.resolve(compRef); });
        }
        return runtime_1.Promise.resolve(true);
    };
    Bootloader.prototype.createDoc = function (component) {
        var selector = new directive_resolver_1.DirectiveResolver().resolve(component).selector;
        var serverDoc = DOM.createHtmlDocument();
        var el = DOM.createElement(selector);
        DOM.appendChild(serverDoc.body, el);
        return serverDoc;
    };
    Bootloader.prototype.handleError = function (format, err) {
        console.log(format, err);
        throw err;
    };
    return Bootloader;
}());
exports.Bootloader = Bootloader;
