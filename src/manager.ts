
export interface ICommandParameter {
    name: string;
    description: string;
    type: string;
}

export interface ICommand {
    command: string;
    description: string;
    parameters: ICommandParameter[];
    action: (...args: Array<number | string>) => void;
}

export interface ICategory {
    name: string;
    description: string;
    commands: Map<string, ICommand>;
}

export class CommandManager {
    public static categories: Map<string, ICategory> = new Map();
    public static commands: Map<string, ICommand> = new Map();

    public static runCommand(commandName: string, ...args: Array<number | string>) {
        if (CommandManager.commands.has(commandName)) {
            const commandData = CommandManager.commands.get(commandName) as ICommand;
           commandData.action(...args);
        } else {
            throw new Error("Command not found");
        }
    }

    public static registerCommand(commandName: string, command: ICommand) {
       if(CommandManager.commands.has(commandName)) {
           throw new Error(`Command ${commandName} is already registered`)
       }

       CommandManager.commands.set(commandName, command);
    }

    public static registerCategory(categoryName: string, category: ICategory) {
        if(CommandManager.categories.has(categoryName)) {
            throw new Error(`Category ${categoryName} is already registered`)
        }
 
        CommandManager.categories.set(categoryName, category);
    }
}
