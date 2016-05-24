'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('@angular/core/src/facade/lang');
var server_renderer_1 = require('./server_renderer');
var devMode = lang_1.assertionsEnabled();
exports.serverDefault = {
    prebootStart: false,
    debug: false,
    uglify: !devMode,
    renderLimitMs: 1000,
    pageSizeLimitKb: 500
};
var AngularUni = (function () {
    function AngularUni() {
    }
    AngularUni.render = function (component, providers, options) {
        if (options === void 0) { options = {
            server: exports.serverDefault
        }; }
        var renderer = new server_renderer_1.default(options.server);
        renderer.render(component, providers);
    };
    return AngularUni;
}());
exports.AngularUni = AngularUni;
__export(require('./router'));
