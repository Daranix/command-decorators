import "reflect-metadata";
export declare function Command(name: string, commandOpts?: {
    description: string;
}): (target: any, propertyKey: string, descriptor?: PropertyDescriptor | undefined) => void;
