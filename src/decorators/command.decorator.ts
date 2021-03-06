import { CommandManager } from "../manager";
import { ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";

// https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b

export function Command(name: string, commandOpts?: { description: string }) {
    console.log("Command(): evaluated");
    return (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
        const commandsInsideClass = Reflect.getOwnMetadata("Commands", target) as Array<ICommand> || [];
        // const functionParameters = Reflect.getOwnMetadata("Parameters", target[propertyKey])
        const commandData: ICommand = {
            description: commandOpts?.description,
            action: () => { throw new Error("This command not was initialized") },
            propertyKey,
            command: name,
            parameters: []
        };
        commandsInsideClass.push(commandData);
        // CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata("Commands", commandsInsideClass, target);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}
