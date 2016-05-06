'use strict';
var router_1 = require('./router');
var bootloader_1 = require('./bootloader');
var ServerRenderer = (function () {
    function ServerRenderer() {
    }
    ServerRenderer.render = function (component, providers, customOptions) {
        var booloader = new bootloader_1.Bootloader;
        booloader.serialize(component)
            .then(function (html) {
            router_1.Router.render(html);
            console.log('rendered');
        }).await();
    };
    return ServerRenderer;
}());
exports.ServerRenderer = ServerRenderer;
