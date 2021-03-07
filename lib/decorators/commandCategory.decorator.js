"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCategory = void 0;
require("reflect-metadata");
var metadatasymbols_1 = require("../symbols/metadatasymbols");
function CommandCategory(categoryInfo) {
    var name = categoryInfo.name, description = categoryInfo.description, iocIdentifier = categoryInfo.iocIdentifier;
    console.log("CommandCategory(): evaluated");
    return function (target) {
        var commandList = Reflect.getMetadata(metadatasymbols_1.METADATAKEY.COMMAND, target.prototype) || [];
        var categoryData = { name: name, description: description, iocIdentifier: iocIdentifier, commands: new Map(commandList.map(function (i) { return [i.command, i]; })) };
        Reflect.defineMetadata(metadatasymbols_1.METADATAKEY.CATEGORY, categoryData, target);
        // CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
exports.CommandCategory = CommandCategory;
//# sourceMappingURL=commandCategory.decorator.js.map