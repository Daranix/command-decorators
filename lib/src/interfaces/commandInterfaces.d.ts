export interface ICommandParameter {
    name?: string;
    description?: string;
    type: Function;
    index: number;
    required?: boolean;
    customType?: boolean;
}
export interface ICommand {
    command: string;
    description?: string;
    parameters: ICommandParameter[];
    action: <T>(...args: Array<number | string>) => T | Promise<T>;
    propertyKey: string;
}
export interface ICategory {
    name: string;
    description: string;
    commands: Map<string, ICommand>;
    iocIdentifier?: unknown;
}
//# sourceMappingURL=commandInterfaces.d.ts.map