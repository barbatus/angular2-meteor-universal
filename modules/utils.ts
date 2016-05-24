'use strict';

import {ComponentRef, NgZone, Testability} from '@angular/core';
import {Router as NgRouter} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ObservableWrapper, TimerWrapper} from '@angular/core/src/facade/async';
import {
  scheduleMicroTask,
  assertionsEnabled
} from '@angular/core/src/facade/lang';

import {REQUEST_URL, BASE_URL} from 'angular2-universal';

import {MeteorApp} from 'angular2-meteor';

import {Router} from './router';
import {TimeAssert, Logger} from './logger';

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
                           waitMs: number = 1000): Promise<boolean> {
  let ngZone = compRef.injector.get(NgZone);
  let logger = compRef.injector.get(Logger);
  let meteorApp = compRef.injector.get(MeteorApp);

  let time = logger.newTimeAssert();
  return new Promise(resolve => {
    ngZone.runOutsideAngular(() => {
      waitRouter(compRef).then(() => {
        let waitHandler;
        meteorApp.onStable(() => {
          time.assertStable();
          clearResolveTimeout(waitHandler);
          waitHandler = null;
          resolve(true);
        });

        waitHandler = setTimeout(function() {
          time.assertNotStable();
          resolve(false);
        }, waitMs);
      });
    });
  });
};
