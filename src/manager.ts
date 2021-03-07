import { ICategory, ICommand } from "./interfaces/commandInterfaces";
import { IoCRegister } from "./interfaces/iocregister";
import { METADATAKEY } from "./symbols/metadatasymbols";
import { DefaultIocContainer } from "./utils/defaultioccontainer";

export class CommandManager {
    public static categories: Map<string, ICategory> = new Map();
    public static commands: Map<string, ICommand> = new Map();
    public static iocContainer: IoCRegister = new DefaultIocContainer();
    public static iocClasses: Array<Object> = [];

    public static runCommand(commandName: string, ...args: Array<number | string>) {
        if (CommandManager.commands.has(commandName)) {
            const commandData = CommandManager.commands.get(commandName) as ICommand;
            commandData.action(...args);
        } else {
            throw new Error("Command not found");
        }
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

    public static setupCategoryClasses(...args: Array<new (...args: any[]) => void>) {
        for (const arg of args) {
            const categoryData: ICategory = Reflect.getMetadata(METADATAKEY.CATEGORY, arg);
            const iocIdentifier = categoryData.iocIdentifier || arg;
            CommandManager.iocContainer.bind(arg, iocIdentifier);
            CommandManager.iocClasses.push(arg);
            const instance = CommandManager.iocContainer.get<Object>(iocIdentifier);
            CommandManager.registerCategory(categoryData.name, categoryData);
            categoryData.commands.forEach((commandData: ICommand) => {
                commandData.action = (instance as any)[commandData.propertyKey];
                CommandManager.registerCommand(commandData.command, commandData);
            });
        }

    }
}
