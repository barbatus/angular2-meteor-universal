'use strict';

import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

import {NgZone} from 'angular2/core';
import {XHR} from 'angular2/compiler';
import {PromiseWrapper, PromiseCompleter} from 'angular2/src/facade/promise';

export class MeteorXHRImpl extends XHR {
  constructor(public ngZone: NgZone) {
    super();
  }

  get(templateUrl: string): Promise<string> {
    const completer: PromiseCompleter<string> = PromiseWrapper.completer();
    if (Meteor.isServer) {
      const data = Assets.getText(templateUrl);
      this.ngZone.run(() => {
        completer.resolve(data);
      });
    }

    return completer.promise;
  }
}
