import 'angular2-universal-polyfills/dist/zone-node';
import 'reflect-metadata';
export declare class ServerRenderer {
    static render(component: any): any;
    private static getRouter();
    private static getCurrentUrl();
    private static getUniOptions(component, baseUrl?, url?);
}
