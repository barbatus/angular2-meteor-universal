import 'angular2-universal-polyfills/dist/zone-node';
export declare class ServerRenderer {
    static render(component: any, providers: any): any;
    private static getRouter();
    private static getCurrentUrl();
    private static getUniOptions(component, providers, baseUrl?, url?);
}
