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
      const fullPath = path.join(this.basePath, templateUrl);

      this.ngZone.run(() => {
        fs.readFile(fullPath, (err, data) => {
          if (err) {
            return completer.reject(`Failed to load ${templateUrl} with error ${err}`);
          }

          this.ngZone.run(() => {
            completer.resolve(data.toString());
          });
        });
      });
    }

    return completer.promise;
  }

  get basePath() {
    if (Meteor.isServer) {
      return path.join(global.process.cwd(), 'assets', 'app');
    }

    return '/';
  }
}
