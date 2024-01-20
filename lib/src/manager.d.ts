import 'reflect-metadata';
import { ICategory, ICommand } from "./interfaces/commandInterfaces";
import { IoCRegister } from "./interfaces/iocregister";
type Constructor<T = {}> = new (...args: any[]) => T;
export declare class CommandManager {
    static categories: Map<string, ICategory>;
    static commands: Map<string, ICommand>;
    static iocContainer: IoCRegister;
    static iocClasses: Array<Object>;
    static runCommand<T>(commandName: string, ...args: Array<number | string>): Promise<T>;
    static registerCommand(commandName: string, command: ICommand): void;
    static registerCategory(categoryName: string, category: ICategory): void;
    static setupCategoryClasses<T extends Constructor[]>(...args: T): void;
}
export {};
//# sourceMappingURL=manager.d.ts.map