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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var compiler_1 = __webpack_require__(5);
	var promise_1 = __webpack_require__(6);
	var MeteorXHRImpl = (function (_super) {
	    __extends(MeteorXHRImpl, _super);
	    function MeteorXHRImpl(ngZone) {
	        _super.call(this);
	        this.ngZone = ngZone;
	    }
	    MeteorXHRImpl.prototype.get = function (templateUrl) {
	        var completer = promise_1.PromiseWrapper.completer();
	        if (Meteor.isServer) {
	            var data_1 = Assets.getText(templateUrl);
	            this.ngZone.run(function () {
	                completer.resolve(data_1);
	            });
	        }
	        return completer.promise;
	    };
	    return MeteorXHRImpl;
	}(compiler_1.XHR));
	exports.MeteorXHRImpl = MeteorXHRImpl;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("angular2/compiler");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/facade/promise");

/***/ }
/******/ ])));