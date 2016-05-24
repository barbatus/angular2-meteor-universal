import { Type } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ClientOptions } from './angular_uni';
export default class ClientRenderer {
    private options;
    constructor(options?: ClientOptions);
    render(component: any, providers?: any): void;
}
export declare function bootstrap(component: Type, providers: Providers, options?: ClientOptions): void;
