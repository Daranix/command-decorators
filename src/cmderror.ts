export class CmdError<T> extends Error {

    detail: T;

    constructor(message: string, detail: T) {
        super(message);
        this.detail = detail;
    }

}