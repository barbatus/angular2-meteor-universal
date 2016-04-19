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
	var angular2_meteor_auto_bootstrap_1 = __webpack_require__(3);
	var angular2_meteor_1 = __webpack_require__(4);
	var router_1 = __webpack_require__(5);
	function bootstrap(appComponentType, providers) {
	    if (providers === void 0) { providers = null; }
	    providers = (providers || []).concat(router_1.Router.baseHrefProvider);
	    Preboot.start();
	    Meteor.defer(function () {
	        Meteor.startup(function () {
	            angular2_meteor_auto_bootstrap_1.bootstrap(appComponentType, providers).then(function (comprRef) {
	                angular2_meteor_1.PromiseQueue.onResolve(function () {
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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = require("angular2-meteor-auto-bootstrap");

/***/ },
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

/***/ }
/******/ ])));