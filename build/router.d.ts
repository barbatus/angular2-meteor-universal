export declare class Router {
    static render(html: string): void;
    static route(...args: any[]): any;
    static group(...args1: any[]): {
        routes: (paths: string[], config: any) => void;
    };
    static flowRouter: any;
    static current: any;
    static reqUrl: string;
    static baseUrl: string;
    static pathDef: string;
    static groupUrl: string;
}
