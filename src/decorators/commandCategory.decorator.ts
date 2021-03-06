import { ICategory, ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";

export function CommandCategory(categoryInfo: { name: string, description: string }) {
    const { name, description } = categoryInfo;
    console.log("CommandCategory(): evaluated");
    return (target: any) => {
        const commandList = Reflect.getMetadata("Commands", target.prototype) as Array<ICommand> || [];
        const categoryData: ICategory = { name, description, commands: new Map(commandList.map((i) => [i.command, i])) };
        Reflect.defineMetadata("CategoryData", categoryData, target.prototype);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
