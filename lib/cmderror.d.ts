export declare class CmdError<T> extends Error {
    detail: T;
    constructor(message: string, detail: T);
}
