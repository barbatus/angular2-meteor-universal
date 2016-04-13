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
	var AngularUni = (function () {
	    function AngularUni() {
	    }
	    AngularUni.render = function (component) {
	        var renderer = AngularUni.getRenderer();
	        renderer.render(component);
	    };
	    AngularUni.getRenderer = function () {
	        if (Meteor.isServer) {
	            return __webpack_require__(1).ServerRenderer;
	        }
	        return __webpack_require__(2).ClientRenderer;
	    };
	    return AngularUni;
	}());
	exports.AngularUni = AngularUni;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("./server_renderer");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("./client_renderer");

/***/ }
/******/ ])));