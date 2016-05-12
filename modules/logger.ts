'use strict';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

export class TimeAssert {
  start: number = Date.now();
  reqUrl: string;

  constructor(reqUrl) {
    this.reqUrl = reqUrl;
  }

  assertStable() {
    if (assertionsEnabled()) {
      let time = Date.now() - this.start;
      console.log(`${this.reqUrl} is stable after ${time}ms`);
    }
  }

  assertNotStable() {
    if (assertionsEnabled()) {
      let time = Date.now() - this.start;
      console.log(`${this.reqUrl} is not stable after ${time}ms`);
    }
  }
}