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
    Object.defineProperty(Router, "flowRouter", {
        get: function () {
            var flowSSR = Package['kadira:flow-router-ssr'];
            return flowSSR && flowSSR.FlowRouter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "reqUrl", {
        get: function () {
            if (this.flowRouter) {
                var current = this.flowRouter.current();
                if (this.baseUrl.length > 1) {
                    return current.path.replace(this.baseUrl, '');
                }
            }
            return this.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router, "baseUrl", {
        get: function () {
            if (this.flowRouter) {
                var current = this.flowRouter.current();
                return current.route.pathDef;
            }
            return '/';
        },
        enumerable: true,
        configurable: true
    });
    return Router;
}());
exports.Router = Router;
