'use strict';

import * as fs from 'fs';
import * as path from 'path';

import {NgZone} from 'angular2/core';
import {XHR} from 'angular2/compiler';
import {PromiseWrapper, PromiseCompleter} from 'angular2/src/facade/promise';

const serverJsonPath = path.resolve(global.process.argv[2]);
const serverDir = path.dirname(serverJsonPath);

export class MeteorXHRImpl extends XHR {
  private _serverDir: string;

  constructor(public ngZone: NgZone) {
    super();
  }

  get(templateUrl: string): Promise<string> {
    const completer: PromiseCompleter<string> = PromiseWrapper.completer();
    const fullPath = path.join(this.assetsPath, templateUrl);
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
    return completer.promise;
  }

  get assetsPath() {
    return path.join(serverDir, 'assets', 'app');
  }
}
