import { ICategory, ICommand } from "./interfaces/commandInterfaces";
export declare class CommandManager {
    static categories: Map<string, ICategory>;
    static commands: Map<string, ICommand>;
    static runCommand(commandName: string, ...args: Array<number | string>): void;
    static registerCommand(commandName: string, command: ICommand): void;
    static registerCategory(categoryName: string, category: ICategory): void;
}
