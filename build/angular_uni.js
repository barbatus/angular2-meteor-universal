'use strict';
var meteor_1 = require('meteor/meteor');
var AngularUni = (function () {
    function AngularUni() {
    }
    AngularUni.render = function (component, providers) {
        var renderer = AngularUni.getRenderer();
        renderer.render(component, providers);
    };
    AngularUni.getRenderer = function () {
        if (meteor_1.Meteor.isServer) {
            return require('./server_renderer').ServerRenderer;
        }
        return require('./client_renderer').ClientRenderer;
    };
    return AngularUni;
}());
exports.AngularUni = AngularUni;
