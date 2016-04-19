import 'angular2-universal-polyfills/dist/zone-node';
export declare class ServerRenderer {
    static render(component: any, providers?: any, customOptions?: any): any;
    private static createServerDoc(component);
    private static getUniOptions(component, providers?, customOptions?);
}
