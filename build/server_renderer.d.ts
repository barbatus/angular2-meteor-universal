import './runtime';
import { Providers } from 'angular2-meteor';
import { ServerOptions } from './angular_uni';
export default class ServerRenderer {
    private options;
    constructor(options?: ServerOptions);
    render(component: any, providers?: Providers): void;
}
