import "reflect-metadata";
export declare function Command(name: string, commandInfo?: {
    description: string;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
