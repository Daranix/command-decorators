"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCategory = void 0;
require("reflect-metadata");
const metadatasymbols_1 = require("../symbols/metadatasymbols");
function CommandCategory(categoryInfo) {
    const { name, description, iocIdentifier } = categoryInfo;
    console.log("CommandCategory(): evaluated");
    return (target) => {
        const commandList = Reflect.getMetadata(metadatasymbols_1.METADATAKEY.COMMAND, target.prototype) || [];
        const categoryData = { name, description, iocIdentifier, commands: new Map(commandList.map((i) => [i.command, i])) };
        Reflect.defineMetadata(metadatasymbols_1.METADATAKEY.CATEGORY, categoryData, target);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
exports.CommandCategory = CommandCategory;
//# sourceMappingURL=commandCategory.decorator.js.map