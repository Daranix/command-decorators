import { ICategory, ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";
import { METADATAKEY } from "../symbols/metadatasymbols";
import { CommandManager } from "../manager";

export function CommandCategory(categoryInfo: { name: string, description: string, iocIdentifier?: unknown }) {
    const { name, description, iocIdentifier } = categoryInfo;
    return (target: any) => {
        const commandList = Reflect.get(target.prototype, METADATAKEY.COMMAND) as Array<ICommand> || [];
        const categoryData: ICategory = { name, description, iocIdentifier, commands: new Map(commandList.map((i) => [i.command, i])) };
        Reflect.set(target, METADATAKEY.CATEGORY, categoryData);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
