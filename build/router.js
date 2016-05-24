'use strict';
var Router = (function () {
    function Router() {
    }
    Router.render = function (html) {
        if (this.flowRouter) {
            var ssrContext = this.flowRouter.ssrContext.get();
            ssrContext.setHtml(html);
        }
    };
    Router.route = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this.flowRouter.route.apply(this.flowRouter, args);
    };
    Router.group = function () {
        var args1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args1[_i - 0] = arguments[_i];
        }
        var group = this.flowRouter.group.apply(this.flowRouter, args1);
        group.routes = function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i - 0] = arguments[_i];
            }
            var routes = args2[0];
            if (!_.isArray(routes)) {
                throw new Error('[routes]: route paths should be an array');
            }
            for (var _a = 0, routes_1 = routes; _a < routes_1.length; _a++) {
                var route = routes_1[_a];
                var args = args2.slice(1);
                group.route.apply(group, [route].concat(args));
            }
        };
        return group;
    };
    Object.defineProperty(Router, "flowRouter", {
        get: function () {
            var flowSSR = Package['kadira:flow-router-ssr'];
            return flowSSR && flowSSR.FlowRouter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "current", {
        get: function () {
            return this.flowRouter && this.flowRouter.current();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "reqUrl", {
        get: function () {
            if (!this.current)
                return null;
            if (this.baseUrl.length > 1) {
                return this.current.path.replace(this.baseUrl, '');
            }
            return this.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "baseUrl", {
        get: function () {
            if (!this.current)
                return null;
            return this.groupUrl || '/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "pathDef", {
        get: function () {
            if (!this.current)
                return null;
            return this.current.route.pathDef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "groupUrl", {
        get: function () {
            if (!this.current)
                return null;
            var current = this.current.route;
            if (current.group) {
                var fullPath = current.group.prefix;
                var route = current.group.parent;
                while (route) {
                    fullPath += route.prefix;
                    route = route.parent;
                }
                return fullPath;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return Router;
}());
exports.Router = Router;
