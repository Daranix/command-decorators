import "reflect-metadata";
import { CommandManager, ICommand } from "./manager";

function CommandCategory(categoryData: { name: string, description: string }) {
    const { name, description } = categoryData;
    console.log("CommandCategory(): evaluated");
    return (target: any) => {
        const commandList = Reflect.getMetadata("Commands", target) as Array<ICommand> || [];
        const categoryData = { name, description, commands: new Map(commandList.map(i => [i.command, i])) };
        CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name; 
    };
}

function Command(name: string, commandOpts?: { description: string }) {
    console.log("Command(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const commandsInsideClass = Reflect.getOwnMetadata("Commands", target.constructor) as Array<ICommand> || [];
        const commandData: ICommand = { description: "", action: target[propertyKey], command: name, parameters: [] };
        commandsInsideClass.push(commandData);
        CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata("Commands", commandsInsideClass, target.constructor);
        //CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}

@CommandCategory({ name: "Prueba", description: "Categoria de prueba"})
class Prueba {
    @Command("hello")
    public metodo() { console.log("Hola"); }
}

CommandManager.runCommand("hello", ...[]);
