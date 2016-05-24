import { Type } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ClientOptions, UniOptions } from './angular_uni';
export declare const clientDefault: ClientOptions;
export declare class AngularUni implements AngularUni {
    static render(component: Type, providers?: Providers, options?: UniOptions): void;
}
export * from './router';
