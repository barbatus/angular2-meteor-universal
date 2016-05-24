export declare class TimeAssert {
    private logger;
    start: number;
    constructor(logger: Logger);
    assertStable(): void;
    assertNotStable(): void;
}
export declare class Logger {
    private appUrl;
    private isDebug;
    constructor(appUrl: string, isDebug?: boolean);
    newTimeAssert(): TimeAssert;
    debug(msg: string): void;
    warn(msg: string): void;
    private logMsg(msg);
}
