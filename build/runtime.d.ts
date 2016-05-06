import { ApplicationRef } from '@angular/core';
import 'angular2-universal-polyfills/dist/zone-node';
export declare let Promise: any;
export declare function waitRender(appRef: ApplicationRef, maxZoneTurns: number): Promise<void>;
