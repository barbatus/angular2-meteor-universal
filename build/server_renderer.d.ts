import 'angular2-meteor-polyfills';
import { Providers } from 'angular2-meteor';
import { ServerOptions } from './bootstrap';
export default class ServerRenderer {
    private options;
    constructor(options?: ServerOptions);
    render(component: any, providers?: Providers): string;
}
