import { NgZone } from 'angular2/core';
import { XHR } from 'angular2/compiler';
export declare class MeteorXHRImpl extends XHR {
    ngZone: NgZone;
    private _serverDir;
    constructor(ngZone: NgZone);
    get(templateUrl: string): Promise<string>;
    assetsPath: string;
}
