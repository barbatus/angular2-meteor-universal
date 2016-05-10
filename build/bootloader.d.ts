import { Type } from '@angular/core';
import './runtime';
export declare class Bootloader {
    private static platRef;
    serialize(component: Type): string;
    appProviders: any[];
    private static platform;
    private application(component, providers?);
    private bootstrap(component);
    private createDoc(component);
}
