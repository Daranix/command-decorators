import { ICategory, ICommand } from "./interfaces/commandInterfaces";
import { IoCRegister } from "./interfaces/iocregister";
export declare class CommandManager {
    static categories: Map<string, ICategory>;
    static commands: Map<string, ICommand>;
    static iocContainer: IoCRegister;
    static runCommand(commandName: string, ...args: Array<number | string>): void;
    static registerCommand(commandName: string, command: ICommand): void;
    static registerCategory(categoryName: string, category: ICategory): void;
    /**
     * Clears all the commands registered on the manager.
     * @static
     * @memberof CommandManager
     */
    static clear(): void;
    static setupCategoryClasses(...args: Array<new (...args: any[]) => void>): void;
}
