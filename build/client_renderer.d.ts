import { Type, ComponentRef } from '@angular/core';
import { Providers } from 'angular2-meteor';
import { ClientOptions } from './bootstrap';
export default class ClientRenderer {
    private options;
    constructor(options?: ClientOptions);
    render(component: Type, providers?: Providers): Promise<ComponentRef<any>>;
}
export declare function bootstrap(component: Type, providers: Providers, options?: ClientOptions): Promise<ComponentRef<any>>;
