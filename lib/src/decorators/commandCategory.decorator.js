"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCategory = CommandCategory;
require("reflect-metadata");
const metadatasymbols_1 = require("../symbols/metadatasymbols");
function CommandCategory(categoryInfo) {
    const { name, description, iocIdentifier } = categoryInfo;
    return (target) => {
        const commandList = Reflect.get(target.prototype, metadatasymbols_1.METADATAKEY.COMMAND) || [];
        const categoryData = { name, description, iocIdentifier, commands: new Map(commandList.map((i) => [i.command, i])) };
        Reflect.set(target, metadatasymbols_1.METADATAKEY.CATEGORY, categoryData);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
//# sourceMappingURL=commandCategory.decorator.js.map