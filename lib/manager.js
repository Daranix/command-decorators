"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
var metadatasymbols_1 = require("./symbols/metadatasymbols");
var defaultioccontainer_1 = require("./utils/defaultioccontainer");
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
            throw new Error("Command ".concat(commandName, " is already registered"));
        }
        CommandManager.commands.set(commandName, command);
    };
    CommandManager.registerCategory = function (categoryName, category) {
        if (CommandManager.categories.has(categoryName)) {
            throw new Error("Category ".concat(categoryName, " is already registered"));
        }
        CommandManager.categories.set(categoryName, category);
    };
    CommandManager.setupCategoryClasses = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _loop_1 = function (arg) {
            var categoryData = Reflect.getMetadata(metadatasymbols_1.METADATAKEY.CATEGORY, arg);
            var iocIdentifier = categoryData.iocIdentifier || arg;
            CommandManager.iocContainer.bind(arg, iocIdentifier);
            CommandManager.iocClasses.push(arg);
            var instance = CommandManager.iocContainer.get(iocIdentifier);
            CommandManager.registerCategory(categoryData.name, categoryData);
            categoryData.commands.forEach(function (commandData) {
                commandData.action = instance[commandData.propertyKey];
                CommandManager.registerCommand(commandData.command, commandData);
            });
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            _loop_1(arg);
        }
    };
    CommandManager.categories = new Map();
    CommandManager.commands = new Map();
    CommandManager.iocContainer = new defaultioccontainer_1.DefaultIocContainer();
    CommandManager.iocClasses = [];
    return CommandManager;
}());
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.js.map