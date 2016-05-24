import { Type } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ServerOptions } from './angular_uni';
export declare class Bootloader {
    private static platRef;
    serialize(component: Type, providers: Providers, options: ServerOptions): string;
    getAppProviders(options?: ServerOptions): Providers;
    private bootstrap(component, providers, options);
    private createDoc(component);
}
