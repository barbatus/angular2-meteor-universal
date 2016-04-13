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

	'use strict';
	var promise_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"meteor/promise\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(9);
	__webpack_require__(10);
	var angular2_universal_1 = __webpack_require__(11);
	var core_1 = __webpack_require__(12);
	var router_1 = __webpack_require__(13);
	var compiler_1 = __webpack_require__(7);
	var angular2_meteor_1 = __webpack_require__(4);
	var meteor_xhr_impl_1 = __webpack_require__(14);
	var ServerRenderer = (function () {
	    function ServerRenderer() {
	    }
	    ServerRenderer.render = function (component) {
	        var url = this.getCurrentUrl();
	        var options = this.getUniOptions(component, '/', url);
	        var bootloader = angular2_universal_1.Bootloader.create(options);
	        var serialize = bootloader.serializeApplication();
	        var html = null;
	        new promise_1.Promise(function (resolve, reject) {
	            serialize.then(function (result) {
	                html = result;
	                resolve();
	            }, reject);
	        }).await();
	        var router = this.getRouter();
	        if (router) {
	            var ssrContext = router.ssrContext.get();
	            ssrContext.setHtml(html);
	        }
	        return html;
	    };
	    ServerRenderer.getRouter = function () {
	        var flowSSR = Package['kadira:flow-router-ssr'];
	        return flowSSR && flowSSR.FlowRouter;
	    };
	    ServerRenderer.getCurrentUrl = function () {
	        return '/';
	    };
	    ServerRenderer.getUniOptions = function (component, baseUrl, url) {
	        var options = {
	            buildClientScripts: true,
	            providers: [
	                new core_1.Provider(compiler_1.XHR, {
	                    useFactory: function (ngZone) {
	                        return new meteor_xhr_impl_1.MeteorXHRImpl(ngZone);
	                    },
	                    deps: [core_1.NgZone]
	                })
	            ],
	            componentProviders: [
	                core_1.provide(router_1.APP_BASE_HREF, { useValue: baseUrl }),
	                core_1.provide(angular2_universal_1.REQUEST_URL, { useValue: url }),
	                router_1.ROUTER_PROVIDERS,
	                angular2_universal_1.NODE_ROUTER_PROVIDERS,
	                angular2_meteor_1.METEOR_PROVIDERS
	            ],
	            template: '<app />',
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


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("angular2-meteor");

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2/compiler");

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal-polyfills/dist/zone-node");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("reflect-metadata");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("angular2/core");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("angular2/router");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("./meteor_xhr_impl");

/***/ }
/******/ ])));