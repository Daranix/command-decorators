import 'reflect-metadata'
import { ICategory, ICommand } from "./interfaces/commandInterfaces";
import { IoCRegister } from "./interfaces/iocregister";
import { METADATAKEY } from "./symbols/metadatasymbols";
import { DefaultIocContainer } from "./utils/defaultioccontainer";

type Constructor<T = {}> = new (...args: any[]) => T;

export class CommandManager {
    public static categories: Map<string, ICategory> = new Map();
    public static commands: Map<string, ICommand> = new Map();
    public static iocContainer: IoCRegister = new DefaultIocContainer();
    public static iocClasses: Array<Object> = [];

    public static async runCommand<T>(commandName: string, ...args: Array<number | string>) {
        if (CommandManager.commands.has(commandName)) {
            const commandData = CommandManager.commands.get(commandName) as ICommand;
            return await commandData.action<T>(...args);
        }

        throw new Error(`Command ${commandName} not found`);

    }

    public static registerCommand(commandName: string, command: ICommand) {
        if (CommandManager.commands.has(commandName)) {
            throw new Error(`Command ${commandName} is already registered`);
        }

        CommandManager.commands.set(commandName, command);
    }

    public static registerCategory(categoryName: string, category: ICategory) {
        if (CommandManager.categories.has(categoryName)) {
            throw new Error(`Category ${categoryName} is already registered`);
        }

        CommandManager.categories.set(categoryName, category);
    }

    public static setupCategoryClasses<T extends Constructor[]>(...args: T) {
        for (const arg of args) {
            const categoryData: ICategory = Reflect.get(arg, METADATAKEY.CATEGORY);
            const iocIdentifier = categoryData.iocIdentifier || arg;
            CommandManager.iocContainer.bind(arg, iocIdentifier);
            CommandManager.iocClasses.push(arg);
            const instance = CommandManager.iocContainer.get<Object>(iocIdentifier);
            CommandManager.registerCategory(categoryData.name, categoryData);

            for (const [,commandData] of categoryData.commands) {
                commandData.action = (instance as any)[commandData.propertyKey];
                CommandManager.registerCommand(commandData.command, commandData);
            }
        }

    }
}
