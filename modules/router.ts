'use strict'

import {provide} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';

export class Router {
  static render(html: string) {
    if (this.flowRouter) {
      var ssrContext = this.flowRouter.ssrContext.get();
      ssrContext.setHtml(html);
    }
  }

  static get baseHrefProvider() {
    return provide(APP_BASE_HREF, { useValue: this.baseUrl })
  }

  private static get flowRouter() {
    const flowSSR = Package['kadira:flow-router-ssr'];
    return flowSSR && flowSSR.FlowRouter;
  }

  static get reqUrl() {
    if (this.flowRouter) {
      const current = this.flowRouter.current();
      return current.path;
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
