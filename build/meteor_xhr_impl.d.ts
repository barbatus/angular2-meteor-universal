import { NgZone } from '@angular/core';
import { XHR } from '@angular/compiler';
export declare class MeteorXHRImpl extends XHR {
    ngZone: NgZone;
    constructor(ngZone: NgZone);
    get(templateUrl: string): Promise<string>;
    assetsPath: string;
}
