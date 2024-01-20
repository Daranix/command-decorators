export interface IoCRegister {
    get<T>(identifier: unknown): T;
    bind(type: new (...args: any[]) => void, identifier?: unknown): void;
}
//# sourceMappingURL=iocregister.d.ts.map