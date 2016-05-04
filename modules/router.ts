'use strict'

export class Router {
  static render(html: string) {
    if (this.flowRouter) {
      var ssrContext = this.flowRouter.ssrContext.get();
      ssrContext.setHtml(html);
    }
  }

  private static get flowRouter() {
    const flowSSR = Package['kadira:flow-router-ssr'];
    return flowSSR && flowSSR.FlowRouter;
  }

  static get reqUrl() {
    if (this.flowRouter) {
      const current = this.flowRouter.current();
      return current.path.replace(this.baseUrl, '') || '/';
    }
    return this.baseUrl;
  }

  static get baseUrl() {
    if (this.flowRouter) {
      const current = this.flowRouter.current();
      return current.route.pathDef;
    }
    return '/';
  }  
}
