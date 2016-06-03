import { Type, ComponentRef } from '@angular/core';
import { Providers } from 'angular2-meteor';
export interface ClientOptions {
    debug?: boolean;
}
export interface Preboot {
    start?: boolean;
    freeze?: string;
    replay?: string;
    buffer?: boolean;
    uglify?: boolean;
    listen?: any;
    presets?: string[];
}
export interface ServerOptions {
    debug?: boolean;
    on?: boolean;
    renderLimitMs?: number;
    pageSizeLimitKb?: number;
    preboot?: Preboot;
}
export interface UniOptions {
    client?: ClientOptions;
    server?: ServerOptions;
}
export declare function bootstrap(component: Type, providers?: Providers, options?: UniOptions): Promise<string | ComponentRef<any>>;
