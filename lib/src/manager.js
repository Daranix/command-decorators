"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
require("reflect-metadata");
const metadatasymbols_1 = require("./symbols/metadatasymbols");
const defaultioccontainer_1 = require("./utils/defaultioccontainer");
class CommandManager {
    static runCommand(commandName, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (CommandManager.commands.has(commandName)) {
                const commandData = CommandManager.commands.get(commandName);
                return yield commandData.action(...args);
            }
            throw new Error("Command not found");
        });
    }
    static registerCommand(commandName, command) {
        if (CommandManager.commands.has(commandName)) {
            throw new Error(`Command ${commandName} is already registered`);
        }
        CommandManager.commands.set(commandName, command);
    }
    static registerCategory(categoryName, category) {
        if (CommandManager.categories.has(categoryName)) {
            throw new Error(`Category ${categoryName} is already registered`);
        }
        CommandManager.categories.set(categoryName, category);
    }
    static setupCategoryClasses(...args) {
        for (const arg of args) {
            const categoryData = Reflect.getMetadata(metadatasymbols_1.METADATAKEY.CATEGORY, arg);
            const iocIdentifier = categoryData.iocIdentifier || arg;
            CommandManager.iocContainer.bind(arg, iocIdentifier);
            CommandManager.iocClasses.push(arg);
            const instance = CommandManager.iocContainer.get(iocIdentifier);
            CommandManager.registerCategory(categoryData.name, categoryData);
            for (const [, commandData] of categoryData.commands) {
                commandData.action = instance[commandData.propertyKey];
                CommandManager.registerCommand(commandData.command, commandData);
            }
        }
    }
}
exports.CommandManager = CommandManager;
CommandManager.categories = new Map();
CommandManager.commands = new Map();
CommandManager.iocContainer = new defaultioccontainer_1.DefaultIocContainer();
CommandManager.iocClasses = [];
//# sourceMappingURL=manager.js.map