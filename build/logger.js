'use strict';
var TimeAssert = (function () {
    function TimeAssert(logger) {
        this.logger = logger;
        this.start = Date.now();
    }
    TimeAssert.prototype.assertStable = function () {
        var time = Date.now() - this.start;
        this.logger.debug("app stable after " + time + "ms");
    };
    TimeAssert.prototype.assertNotStable = function () {
        var time = Date.now() - this.start;
        this.logger.warn("app is not stable after " + time + "ms");
        this.logger.warn('increase rendering time limit or optimize your app');
    };
    return TimeAssert;
}());
exports.TimeAssert = TimeAssert;
var Logger = (function () {
    function Logger(appUrl, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        this.appUrl = appUrl;
        this.isDebug = isDebug;
    }
    Logger.prototype.newTimeAssert = function () {
        return new TimeAssert(this);
    };
    Logger.prototype.debug = function (msg) {
        if (this.isDebug) {
            this.logMsg(msg);
        }
    };
    Logger.prototype.warn = function (msg) {
        this.logMsg(msg);
    };
    Logger.prototype.logMsg = function (msg) {
        console.log("[" + this.appUrl + "]: " + msg);
    };
    return Logger;
}());
exports.Logger = Logger;
