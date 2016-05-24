'use strict';

export class Router {
  static render(html: string) {
    if (this.flowRouter) {
      var ssrContext = this.flowRouter.ssrContext.get();
      ssrContext.setHtml(html);
    }
  }

  static route(...args) {
    return this.flowRouter.route.apply(this.flowRouter, args);
  }

  static group(...args1): { routes: (paths: string[], config: any) => void } {
    let group = this.flowRouter.group.apply(this.flowRouter, args1);
    group.routes = function(...args2) {
      let routes = args2[0];
      if (!_.isArray(routes)) {
        throw new Error('[routes]: route paths should be an array');
      }

      for (let route of routes) {
        let args = args2.slice(1);
        group.route.apply(group, [route, ...args]);
      }
    }

    return group;
  }

  static get flowRouter() {
    const flowSSR = Package['kadira:flow-router-ssr'];
    return flowSSR && flowSSR.FlowRouter;
  }

  static get current() {
    return this.flowRouter && this.flowRouter.current();
  }

  static get reqUrl(): string {
    if (!this.current) return null;

    if (this.baseUrl.length > 1) {
      return this.current.path.replace(this.baseUrl, '');
    }
    return this.baseUrl;
  }

  static get baseUrl(): string {
    if (!this.current) return null;

    return this.groupUrl || '/';
  }

  static get pathDef(): string {
    if (!this.current) return null;

    return this.current.route.pathDef;
  }

  static get groupUrl(): string {
    if (!this.current) return null;

    const current = this.current.route;
    if (current.group) {
      let fullPath = current.group.prefix;
      let route = current.group.parent;
      while (route) {
        fullPath += route.prefix;
        route = route.parent;
      }
      return fullPath;
    }
    return null;
  }
}
