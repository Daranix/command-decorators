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
    action: (...args: Array<number | string>) => void;
    propertyKey: string;
}
export interface ICategory {
    name: string;
    description: string;
    commands: Map<string, ICommand>;
    iocIdentifier?: unknown;
}
