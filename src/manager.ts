
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

    public static registerCommandIntoCategory(categoryName: string, command: ICommand) {
        if (!CommandManager.categories.has(categoryName)) {
            throw new Error(`Error when trying to register command: ${command.command} into category: ${categoryName} (Category doesn't exists)`);
        }

        const category: ICategory = CommandManager.categories.get(categoryName) as ICategory;
        // category.commands.set();

        if (category.commands.has(command.command)) {
            throw new Error(`Command ${command.command} already exists in category: ${categoryName}`);
        }

        category.commands.set(command.command, command);
    }
}
