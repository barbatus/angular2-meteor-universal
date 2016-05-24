'use strict';
require('./runtime');
var router_1 = require('./router');
var bootloader_1 = require('./bootloader');
var angular_uni_server_1 = require('./angular_uni_server');
var ServerRenderer = (function () {
    function ServerRenderer(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.options = _.defaults(options, angular_uni_server_1.serverDefault);
    }
    ServerRenderer.prototype.render = function (component, providers) {
        var booloader = new bootloader_1.Bootloader;
        var html = booloader.serialize(component, providers, this.options);
        router_1.Router.render(html);
    };
    return ServerRenderer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServerRenderer;
