"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandManager = /** @class */ (function () {
    function CommandManager() {
    }
    CommandManager.runCommand = function (commandName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (CommandManager.commands.has(commandName)) {
            var commandData = CommandManager.commands.get(commandName);
            commandData.action.apply(commandData, args);
        }
        else {
            throw new Error("Command not found");
        }
    };
    CommandManager.registerCommand = function (commandName, command) {
        if (CommandManager.commands.has(commandName)) {
            throw new Error("Command " + commandName + " is already registered");
        }
        CommandManager.commands.set(commandName, command);
    };
    CommandManager.registerCategory = function (categoryName, category) {
        if (CommandManager.categories.has(categoryName)) {
            throw new Error("Category " + categoryName + " is already registered");
        }
        CommandManager.categories.set(categoryName, category);
    };
    CommandManager.categories = new Map();
    CommandManager.commands = new Map();
    return CommandManager;
}());
exports.CommandManager = CommandManager;
