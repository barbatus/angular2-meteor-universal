'use strict';

import {ComponentRef, NgZone, Testability} from '@angular/core';
import {Router as NgRouter} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ObservableWrapper} from '@angular/core/src/facade/async';
import {scheduleMicroTask, assertionsEnabled} from '@angular/core/src/facade/lang';

import {REQUEST_URL, BASE_URL} from 'angular2-universal';

import {Router} from './router';
import {TimeAssert} from './logger';

export function waitRouter(compRef: ComponentRef<any>): Promise<ComponentRef<any>> {
  let injector = compRef.injector;
  let router = injector.get(NgRouter, NgRouter);

  if (router && router._currentNavigation) {
    return router._currentNavigation.then(() => Promise.resolve(compRef));
  }

  return Promise.resolve(compRef);
}

function clearResolveTimeout(handler) {
  if (!handler) return handler;

  if (handler.cancelFn) {
    handler.cancelFn(handler);
  }
  clearTimeout(handler);
};

export function waitRender(compRef: ComponentRef<any>,
                           waitMs: number = 1000): Promise<any> {
  let ngZone = compRef.injector.get(NgZone);
  let http = compRef.injector.get(Http, Http);
  // TODO: implement own class similar to testability.
  let testability = compRef.injector.get(Testability, null);
  let baseUrl = compRef.injector.get(BASE_URL);

  // Router.reqUrl doesn't work on the server.
  // Check why context is not accessible.
  let time = new TimeAssert(baseUrl);
  return new Promise(resolve => {
    ngZone.runOutsideAngular(() => {
      waitRouter(compRef).then(() => {
        let waitHandler;

        testability.whenStable(() => {
          time.assertStable();
          testability._callbacks.length = 0;
          clearResolveTimeout(waitHandler);
          resolve(true);
        });

        if (assertionsEnabled()) {
          waitHandler = setTimeout(function() {
            time.assertNotStable();
            testability._callbacks.length = 0;
            resolve(false);
          }, waitMs);
        }
      });
    });
  });
};
