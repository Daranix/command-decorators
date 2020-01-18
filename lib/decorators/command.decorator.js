"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("../manager");
require("reflect-metadata");
function Command(name, commandOpts) {
    console.log("Command(): evaluated");
    return function (target, propertyKey, descriptor) {
        var commandsInsideClass = Reflect.getOwnMetadata("Commands", target.constructor) || [];
        var commandData = { description: "", action: target[propertyKey], command: name, parameters: [] };
        commandsInsideClass.push(commandData);
        manager_1.CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata("Commands", commandsInsideClass, target.constructor);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}
exports.Command = Command;
