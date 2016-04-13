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
	var angular2_meteor_auto_bootstrap_1 = __webpack_require__(3);
	var angular2_meteor_1 = __webpack_require__(4);
	function bootstrap(appComponentType, providers) {
	    if (providers === void 0) { providers = null; }
	    if (preboot)
	        preboot.start();
	    Meteor.defer(function () {
	        Meteor.startup(function () {
	            angular2_meteor_auto_bootstrap_1.bootstrap(appComponentType, providers).then(function (comprRef) {
	                angular2_meteor_1.PromiseQueue.onResolve(function () {
	                    if (preboot)
	                        preboot.complete();
	                });
	            });
	        });
	    });
	}
	exports.bootstrap = bootstrap;


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

/***/ }
/******/ ])));