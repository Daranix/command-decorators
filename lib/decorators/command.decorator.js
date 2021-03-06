"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
require("reflect-metadata");
// https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b
function Command(name, commandOpts) {
    console.log("Command(): evaluated");
    return function (target, propertyKey, descriptor) {
        var commandsInsideClass = Reflect.getOwnMetadata("Commands", target) || [];
        // const functionParameters = Reflect.getOwnMetadata("Parameters", target[propertyKey])
        var commandData = {
            description: commandOpts === null || commandOpts === void 0 ? void 0 : commandOpts.description,
            action: function () { throw new Error("This command not was initialized"); },
            propertyKey: propertyKey,
            command: name,
            parameters: []
        };
        commandsInsideClass.push(commandData);
        // CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata("Commands", commandsInsideClass, target);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}
exports.Command = Command;
//# sourceMappingURL=command.decorator.js.map