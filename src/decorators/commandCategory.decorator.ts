import { ICategory, ICommand } from "../interfaces/commandInterfaces";
import "reflect-metadata";
import { METADATAKEY } from "../symbols/metadatasymbols";

export function CommandCategory(categoryInfo: { name: string, description: string, iocIdentifier?: unknown }) {
    const { name, description, iocIdentifier } = categoryInfo;
    console.log("CommandCategory(): evaluated");
    return (target: any) => {
        const commandList = Reflect.getMetadata(METADATAKEY.COMMAND, target.prototype) as Array<ICommand> || [];
        const categoryData: ICategory = { name, description, iocIdentifier, commands: new Map(commandList.map((i) => [i.command, i])) };
        Reflect.defineMetadata(METADATAKEY.CATEGORY, categoryData, target);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
