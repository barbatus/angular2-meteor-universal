'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var path = require('path');
var compiler_1 = require('@angular/compiler');
var promise_1 = require('@angular/core/src/facade/promise');
var serverJsonPath = path.resolve(global.process.argv[2]);
var serverDir = path.dirname(serverJsonPath);
var MeteorXHRImpl = (function (_super) {
    __extends(MeteorXHRImpl, _super);
    function MeteorXHRImpl(ngZone) {
        _super.call(this);
        this.ngZone = ngZone;
    }
    MeteorXHRImpl.prototype.get = function (templateUrl) {
        var _this = this;
        var completer = promise_1.PromiseWrapper.completer();
        var fullPath = path.join(this.assetsPath, templateUrl);
        this.ngZone.run(function () {
            fs.readFile(fullPath, function (err, data) {
                if (err) {
                    return completer.reject("Failed to load " + templateUrl + " with error " + err);
                }
                _this.ngZone.run(function () {
                    completer.resolve(data.toString());
                });
            });
        });
        return completer.promise;
    };
    Object.defineProperty(MeteorXHRImpl.prototype, "assetsPath", {
        get: function () {
            return path.join(serverDir, 'assets', 'app');
        },
        enumerable: true,
        configurable: true
    });
    return MeteorXHRImpl;
}(compiler_1.XHR));
exports.MeteorXHRImpl = MeteorXHRImpl;
