(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	var Fiber = __webpack_require__(12);
	var Promise = __webpack_require__(13);
	Promise.Fiber = Fiber;
	var nativeThen = Promise.prototype.then;
	__webpack_require__(14);
	// Zone sets own promise and overrides 'then' in the
	// global one (Meteor promise) if any, but we need
	// Meteor promise to be within Meteor environment.
	// TODO: take a look how to support Zone-aware promise
	// that works with fibers.
	Promise.prototype.then = nativeThen;
	global.Promise = Promise;
	var angular2_universal_1 = __webpack_require__(15);
	var core_1 = __webpack_require__(6);
	var router_1 = __webpack_require__(7);
	var compiler_1 = __webpack_require__(10);
	var directive_resolver_1 = __webpack_require__(16);
	var dom_adapter_1 = __webpack_require__(17);
	var angular2_meteor_1 = __webpack_require__(4);
	var meteor_xhr_impl_1 = __webpack_require__(18);
	var router_2 = __webpack_require__(5);
	var ServerRenderer = (function () {
	    function ServerRenderer() {
	    }
	    ServerRenderer.render = function (component, providers, customOptions) {
	        var options = this.getUniOptions(component, providers, customOptions);
	        var bootloader = angular2_universal_1.Bootloader.create(options);
	        var serialize = bootloader.serializeApplication();
	        var html = null;
	        new Promise(function (resolve, reject) {
	            serialize.then(function (result) {
	                html = result;
	                resolve();
	            }, reject);
	        }).await();
	        router_2.Router.render(html);
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
	                angular2_universal_1.NODE_ROUTER_PROVIDERS,
	                angular2_universal_1.NODE_HTTP_PROVIDERS,
	                angular2_meteor_1.METEOR_PROVIDERS,
	                core_1.provide(angular2_universal_1.ORIGIN_URL, { useValue: global.process.env.ENV_VARIABLE }),
	                router_2.Router.baseHrefProvider,
	                core_1.provide(angular2_universal_1.REQUEST_URL, { useValue: router_2.Router.reqUrl }),
	                core_1.provide(router_1.LocationStrategy, {
	                    useClass: router_1.PathLocationStrategy
	                }),
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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("angular2-meteor");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core_1 = __webpack_require__(6);
	var router_1 = __webpack_require__(7);
	var Router = (function () {
	    function Router() {
	    }
	    Router.render = function (html) {
	        if (this.flowRouter) {
	            var ssrContext = this.flowRouter.ssrContext.get();
	            ssrContext.setHtml(html);
	        }
	    };
	    Object.defineProperty(Router, "baseHrefProvider", {
	        get: function () {
	            return core_1.provide(router_1.APP_BASE_HREF, { useValue: this.baseUrl });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Router, "flowRouter", {
	        get: function () {
	            var flowSSR = Package['kadira:flow-router-ssr'];
	            return flowSSR && flowSSR.FlowRouter;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Router, "reqUrl", {
	        get: function () {
	            if (this.flowRouter) {
	                var current = this.flowRouter.current();
	                return current.path;
	            }
	            return this.baseUrl;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Router, "baseUrl", {
	        get: function () {
	            if (this.flowRouter) {
	                var current = this.flowRouter.current();
	                return current.route.pathDef;
	            }
	            return '/';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Router;
	}());
	exports.Router = Router;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("angular2/core");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2/router");

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = require("angular2/compiler");

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	module.exports = require("fibers");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("meteor-promise");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal-polyfills/dist/zone-node");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/core/linker/directive_resolver");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/platform/dom/dom_adapter");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("./meteor_xhr_impl");

/***/ }
/******/ ])));