import { Type } from '@angular/core';
export declare class Bootloader {
    private static platRef;
    serialize(component: Type): Promise<string>;
    appProviders: any[];
    private static platform;
    private application(component, providers?);
    private bootstrap(component);
    private waitRouter(compRef);
    private createDoc(component);
    private handleError(format, err);
}
