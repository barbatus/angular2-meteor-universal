'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var client_renderer_1 = require('./client_renderer');
exports.clientDefault = {
    debug: false
};
var AngularUni = (function () {
    function AngularUni() {
    }
    AngularUni.render = function (component, providers, options) {
        if (options === void 0) { options = {
            client: exports.clientDefault
        }; }
        var renderer = new client_renderer_1.default(options.client);
        renderer.render(component, providers);
    };
    return AngularUni;
}());
exports.AngularUni = AngularUni;
__export(require('./router'));
