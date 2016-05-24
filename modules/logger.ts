'use strict';

import {assertionsEnabled} from '@angular/core/src/facade/lang';

export class TimeAssert {
  start: number = Date.now();

  constructor(private logger: Logger) {}

  assertStable() {
    let time = Date.now() - this.start;
    this.logger.debug(`app stable after ${time}ms`);
  }

  assertNotStable() {
    let time = Date.now() - this.start;
    this.logger.warn(`app is not stable after ${time}ms`);
    this.logger.warn('increase rendering time limit or optimize your app');
  }
}

export class Logger {
  constructor(private appUrl: string,
              private isDebug: boolean = false) {}

  newTimeAssert(): TimeAssert {
    return new TimeAssert(this);
  }

  debug(msg: string) {
    if (this.isDebug) {
      this.logMsg(msg);
    }
  }

  warn(msg: string) {
    this.logMsg(msg);
  }

  private logMsg(msg: string) {
    console.log(`[${this.appUrl}]: ${msg}`);
  }
}
