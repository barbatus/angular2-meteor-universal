'use strict';

import {NgZone, ApplicationRef} from '@angular/core';
import {Http} from '@angular/http';

import * as Fiber from 'fibers';
import * as MeteorPromise from 'meteor-promise';
MeteorPromise.Fiber = Fiber;
const nativeThen = MeteorPromise.prototype.then;
import 'angular2-universal-polyfills/dist/zone-node';
// Zone-aware Meteor promise.
MeteorPromise.prototype.then = function(onResolve, onReject) {
  return Zone.current.run(() => {
    return nativeThen.call(this, onResolve, onReject);
  });
};
global.Promise = MeteorPromise;

export let Promise = MeteorPromise;

export function waitRender(appRef: ApplicationRef,
                           maxZoneTurns: number): Promise<void> {
  let ngZone = appRef.injector.get(NgZone);
  let http = appRef.injector.get(Http, Http);

  return new Promise(resolve => {
    ngZone.runOutsideAngular(() => {
      let checkAmount = 0;
      let checkCount = 0;
      function checkStable() {
        // we setTimeout 10 after the first 20 turns
        checkCount++;
        if (checkCount === maxZoneTurns) {
          console.warn('\nWARNING: your application is taking longer than ' + maxZoneTurns + ' Zone turns. \n');
          return resolve();
        }
        if (checkCount === 20) { checkAmount = 10; }

        setTimeout(() => {
          if (ngZone.hasPendingMicrotasks) { return checkStable(); }
          if (ngZone.hasPendingMacrotasks) { return checkStable(); }
          if (http && http._async > 0) { return checkStable(); }
          if (ngZone._isStable) { return resolve(); }
          return checkStable();
        }, checkAmount);
      }
      return checkStable();
    });
  });
};
