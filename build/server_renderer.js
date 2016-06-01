'use strict';
require('angular2-meteor-polyfills');
require('./runtime');
var router_1 = require('./router');
var bootloader_1 = require('./bootloader');
var bootstrap_server_1 = require('./bootstrap_server');
var ServerRenderer = (function () {
    function ServerRenderer(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.options = options;
        _.defaults(this.options, bootstrap_server_1.serverDefault);
        _.defaults(this.options.preboot, bootstrap_server_1.serverDefault.preboot);
    }
    ServerRenderer.prototype.render = function (component, providers) {
        var booloader = new bootloader_1.Bootloader;
        var html = booloader.serialize(component, providers, this.options);
        router_1.Router.render(html);
        return html;
    };
    return ServerRenderer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServerRenderer;
