import { CommandManager, ICommand } from "./manager";

function g(test: string) {
    console.log("g(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log("g(): called");
    };
}

function CommandCategory(categoryData: { name: string, description: string }) {
    const { name, description } = categoryData;
    console.log("CommandCategory(): evaluated");
    return (target: any) => {
        CommandManager.categories.set(name, { name, description, commands: new Map() });
        target._categoryId = name; 
    };
}

function Command(name: string, commandOpts?: { description: string }) {
    console.log("Command(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const commandData: ICommand = { description: "", action: target[propertyKey], command: name, parameters: [] };
        CommandManager.commands.set(name, commandData);
        //CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}

@CommandCategory({ name: "Prueba", description: "Categoria de prueba"})
class Prueba {
    @Command("hello")
    public metodo() { console.log("Hola"); }
}

CommandManager.runCommand("hello", ...[]);
