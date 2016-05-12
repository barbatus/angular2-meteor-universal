'use strict';
var lang_1 = require('@angular/core/src/facade/lang');
var TimeAssert = (function () {
    function TimeAssert(reqUrl) {
        this.start = Date.now();
        this.reqUrl = reqUrl;
    }
    TimeAssert.prototype.assertStable = function () {
        if (lang_1.assertionsEnabled()) {
            var time = Date.now() - this.start;
            console.log(this.reqUrl + " is stable after " + time + "ms");
        }
    };
    TimeAssert.prototype.assertNotStable = function () {
        if (lang_1.assertionsEnabled()) {
            var time = Date.now() - this.start;
            console.log(this.reqUrl + " is not stable after " + time + "ms");
        }
    };
    return TimeAssert;
}());
exports.TimeAssert = TimeAssert;
