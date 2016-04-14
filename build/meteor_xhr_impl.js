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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var path = __webpack_require__(5);
	var compiler_1 = __webpack_require__(6);
	var promise_1 = __webpack_require__(7);
	var MeteorXHRImpl = (function (_super) {
	    __extends(MeteorXHRImpl, _super);
	    function MeteorXHRImpl(ngZone) {
	        _super.call(this);
	        this.ngZone = ngZone;
	    }
	    MeteorXHRImpl.prototype.get = function (templateUrl) {
	        var _this = this;
	        var completer = promise_1.PromiseWrapper.completer();
	        if (Meteor.isServer) {
	            var fullPath_1 = path.join(this.basePath, templateUrl);
	            this.ngZone.run(function () {
	                fs.readFile(fullPath_1, function (err, data) {
	                    if (err) {
	                        return completer.reject("Failed to load " + templateUrl + " with error " + err);
	                    }
	                    _this.ngZone.run(function () {
	                        completer.resolve(data.toString());
	                    });
	                });
	            });
	        }
	        return completer.promise;
	    };
	    Object.defineProperty(MeteorXHRImpl.prototype, "basePath", {
	        get: function () {
	            if (Meteor.isServer) {
	                return path.join(global.process.cwd(), 'assets', 'app');
	            }
	            return '/';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MeteorXHRImpl;
	}(compiler_1.XHR));
	exports.MeteorXHRImpl = MeteorXHRImpl;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("angular2/compiler");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2/src/facade/promise");

/***/ }
/******/ ])));