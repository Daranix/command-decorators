"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("../manager");
require("reflect-metadata");
function CommandCategory(categoryInfo) {
    var name = categoryInfo.name, description = categoryInfo.description;
    console.log("CommandCategory(): evaluated");
    return function (target) {
        var commandList = Reflect.getMetadata("Commands", target) || [];
        var categoryData = { name: name, description: description, commands: new Map(commandList.map(function (i) { return [i.command, i]; })) };
        manager_1.CommandManager.registerCategory(name, categoryData);
        // CommandManager.categories.set(name, { name, description, commands: new Map(commandList.map(i => [i.command, i])) });
        target._categoryId = name;
    };
}
exports.CommandCategory = CommandCategory;
