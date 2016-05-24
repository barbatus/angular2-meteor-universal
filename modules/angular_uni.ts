'use strict';

import {Type} from '@angular/core';

import {Providers} from 'angular2-meteor';

export interface ClientOptions {
  debug?: boolean;
}

export interface ServerOptions {
  debug?: boolean;
  prebootStart?: boolean;
  uglify?: boolean;
  renderLimitMs?: number;
  pageSizeLimitKb?: number;
}

export interface UniOptions {
  client?: ClientOptions;
  server?: ServerOptions;
}

export interface AngularUni {
  render(component: Type, providers?: Providers, options?: UniOptions): void;
}
