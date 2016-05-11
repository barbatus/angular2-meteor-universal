'use strict';
var router_1 = require('./router');
var bootloader_1 = require('./bootloader');
var ServerRenderer = (function () {
    function ServerRenderer() {
    }
    ServerRenderer.render = function (component, providers, customOptions) {
        console.log('Server rendering');
        var booloader = new bootloader_1.Bootloader;
        var html = booloader.serialize(component);
        router_1.Router.render(html);
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
