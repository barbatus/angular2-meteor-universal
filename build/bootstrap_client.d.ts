import { Type, ComponentRef } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ClientOptions, UniOptions } from './bootstrap';
export declare const clientDefault: ClientOptions;
export declare function bootstrap(component: Type, providers?: Providers, options?: UniOptions): Promise<ComponentRef<any>>;
export * from './router';
