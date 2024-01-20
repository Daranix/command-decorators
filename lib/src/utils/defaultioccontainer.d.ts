import { IoCRegister } from "../interfaces/iocregister";
export declare class DefaultIocContainer implements IoCRegister {
    mapContainer: Map<unknown, any>;
    get<T>(identifier: unknown): T;
    bind<T>(type: new (...args: any[]) => T, identifier?: unknown): void;
}
//# sourceMappingURL=defaultioccontainer.d.ts.map