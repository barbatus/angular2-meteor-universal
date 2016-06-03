'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('@angular/core/src/facade/lang');
var server_renderer_1 = require('./server_renderer');
var devMode = lang_1.assertionsEnabled();
exports.serverDefault = {
    debug: false,
    on: true,
    renderLimitMs: 1000,
    pageSizeLimitKb: 500,
    preboot: {
        start: true,
        // Show spinner and freeze page
        // when any of the events in presets happen.
        freeze: 'spinner',
        // Rerender replay strategy.
        replay: 'rerender',
        // Client app will write to hidden div until bootstrap complete.
        buffer: true,
        uglify: !devMode,
        presets: ['keyPress', 'buttonPress', 'focus']
    }
};
function bootstrap(component, providers, options) {
    if (options === void 0) { options = {
        server: exports.serverDefault
    }; }
    return new Promise(function (resolve, reject) {
        var renderer = new server_renderer_1.default(options.server);
        var html = renderer.render(component, providers);
        resolve(html);
    });
}
exports.bootstrap = bootstrap;
__export(require('./router'));
