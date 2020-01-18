import { CommandManager } from "../manager";
import { ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";

export function Command(name: string, commandOpts?: { description: string }) {
    console.log("Command(): evaluated");
    return (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
        const commandsInsideClass = Reflect.getOwnMetadata("Commands", target.constructor) as Array<ICommand> || [];
        const commandData: ICommand = { description: "", action: target[propertyKey], command: name, parameters: [] };
        commandsInsideClass.push(commandData);
        CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata("Commands", commandsInsideClass, target.constructor);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}
