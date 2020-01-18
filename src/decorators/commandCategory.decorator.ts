import { CommandManager } from "../manager";
import { ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";

export function CommandCategory(categoryInfo: { name: string, description: string }) {
    const { name, description } = categoryInfo;
    console.log("CommandCategory(): evaluated");
    return (target: any) => {
        const commandList = Reflect.getMetadata("Commands", target) as Array<ICommand> || [];
        const categoryData = { name, description, commands: new Map(commandList.map((i) => [i.command, i])) };
        CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
