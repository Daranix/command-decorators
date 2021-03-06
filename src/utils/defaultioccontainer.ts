import { IoCRegister } from "../interfaces/iocregister";

export class DefaultIocContainer implements IoCRegister {

    mapContainer = new Map<unknown, any>();

    get<T>(identifier: unknown): T {
        if(!this.mapContainer.has(identifier)) {
            throw new Error(`Unable to find element with identifier ${identifier} on the IoC container`)
        }
        return (this.mapContainer.get(identifier) as T);
    }

    bind<T>(type: new (...args: any[]) => T, identifier?: unknown): void {
        
        if(this.mapContainer.has(identifier)) {
            throw new Error(`Failed to construct singleton with identifier: ${identifier} already exists`);
        }

        this.mapContainer.set(identifier, new type())
    }

}