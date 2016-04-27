'use strict';
var AngularUni = (function () {
    function AngularUni() {
    }
    AngularUni.render = function (component, providers) {
        var renderer = AngularUni.getRenderer();
        renderer.render(component, providers);
    };
    AngularUni.getRenderer = function () {
        if (Meteor.isServer) {
            return require('./server_renderer').ServerRenderer;
        }
        return require('./client_renderer').ClientRenderer;
    };
    return AngularUni;
}());
exports.AngularUni = AngularUni;
