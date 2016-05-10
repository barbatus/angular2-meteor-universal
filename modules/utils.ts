'use strict';

import {ComponentRef, NgZone} from '@angular/core';
import {Router as NgRouter} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {ObservableWrapper} from '@angular/core/src/facade/async';

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


export function waitRender(compRef: ComponentRef,
                           waitMs: number = 500): Promise<any> {
  let ngZone = compRef.injector.get(NgZone);
  let http = compRef.injector.get(Http, Http);

  return new Promise(resolve => {
    ngZone.runOutsideAngular(() => {
      waitRouter(compRef).then(() => {
        if (!ngZone.hasPendingMicrotasks && !ngZone.hasPendingMacrotasks) {
          resolve(true);
          return;
        }

        let waitHandler;
        let sub = ObservableWrapper.subscribe(ngZone.onStable, () => {
          clearResolveTimeout(waitHandler);
          waitHandler = null;
          console.log('onStable');
          ObservableWrapper.dispose(sub);
          resolve(true);
        });

        if (waitMs !== Number.MAX_VALUE) {
          waitHandler = setTimeout(function() {
            console.log('App takes more then 500ms to render');
            ObservableWrapper.dispose(sub);
            resolve(false);
          }, waitMs);
        }
      });
    });
  });
};
