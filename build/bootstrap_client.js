'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var client_renderer_1 = require('./client_renderer');
exports.clientDefault = {
    debug: false
};
function bootstrap(component, providers, options) {
    if (options === void 0) { options = {
        client: exports.clientDefault
    }; }
    return new Promise(function (resolve, reject) {
        var renderer = new client_renderer_1.default(options.client);
        renderer.render(component, providers);
    });
}
exports.bootstrap = bootstrap;
__export(require('./router'));
