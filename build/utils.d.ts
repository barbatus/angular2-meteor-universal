import { ComponentRef, Type } from '@angular/core';
export declare function waitRouter(compRef: ComponentRef<any>): Promise<ComponentRef<any>>;
export declare function waitRender(compRef: ComponentRef<any>, waitMs?: number): Promise<boolean>;
export declare function resolve(component: Type): string;
