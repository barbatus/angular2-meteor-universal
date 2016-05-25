import { Type } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ServerOptions, UniOptions } from './bootstrap';
export declare const serverDefault: ServerOptions;
export declare function bootstrap(component: Type, providers?: Providers, options?: UniOptions): Promise<string>;
export * from './router';
