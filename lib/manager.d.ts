import { ICategory, ICommand } from "./interfaces/commandInterfaces";
import { IoCRegister } from "./interfaces/iocregister";
export declare class CommandManager {
    static categories: Map<string, ICategory>;
    static commands: Map<string, ICommand>;
    static iocContainer: IoCRegister;
    static iocClasses: Array<Object>;
    static runCommand(commandName: string, ...args: Array<number | string>): void;
    static registerCommand(commandName: string, command: ICommand): void;
    static registerCategory(categoryName: string, category: ICategory): void;
    static setupCategoryClasses(...args: Array<new (...args: any[]) => void>): void;
}
