import "reflect-metadata";
export declare function CmdParam({ name, required, description, customType }?: {
    name?: string;
    required?: boolean;
    description?: string;
    customType?: boolean;
}): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
