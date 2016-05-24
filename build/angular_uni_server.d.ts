import { Type } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ServerOptions, UniOptions } from './angular_uni';
export declare const serverDefault: ServerOptions;
export declare class AngularUni implements AngularUni {
    static render(component: Type, providers?: Providers, options?: UniOptions): void;
}
export * from './router';
