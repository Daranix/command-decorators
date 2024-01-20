"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
require("reflect-metadata");
const metadatasymbols_1 = require("../symbols/metadatasymbols");
const cmderror_1 = require("../cmderror");
// https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b
function Command(name, commandInfo) {
    console.log("Command(): evaluated");
    return (target, propertyKey, descriptor) => {
        const commandsInsideClass = Reflect.getOwnMetadata(metadatasymbols_1.METADATAKEY.COMMAND, target) || [];
        const parameters = Reflect.getOwnMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, target, propertyKey);
        const f = target[propertyKey];
        const paramLength = f.length;
        const paramTypes = Reflect.getOwnMetadata("design:paramtypes", target, propertyKey);
        const paramNames = getFunctionArgumentsNames(f);
        for (let i = 0; i < paramLength; i++) {
            if (!parameters[i]) {
                parameters[i] = {
                    name: paramNames[i],
                    index: i,
                    required: true,
                    type: paramTypes[i]
                };
            }
            if (!parameters[i].name) { // Asign default name
                parameters[i].name = paramNames[i];
            }
        }
        const commandData = {
            description: commandInfo === null || commandInfo === void 0 ? void 0 : commandInfo.description,
            // This will be filled when apply the IoC instance
            action: () => { throw new Error("This command not was initialized"); },
            propertyKey,
            command: name,
            parameters: parameters
        };
        const method = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
        const validParamTypes = ['boolean', 'string', 'number'];
        descriptor.value = function (...args) {
            const newArgs = [];
            for (let i = 0; i < paramLength; i++) {
                const arg = args[i];
                const param = parameters.find((p) => p.index === i);
                const paramName = param === null || param === void 0 ? void 0 : param.name;
                if (!(param === null || param === void 0 ? void 0 : param.customType)) {
                    if (validParamTypes.indexOf(typeof arg) < 0 && (param === null || param === void 0 ? void 0 : param.required)) {
                        throw new Error(`Invalid parameter type on: ${paramName}`);
                    }
                    let parsedValue;
                    // eslint-disable-next-line no-useless-catch
                    try {
                        parsedValue = parseToType(arg, paramTypes[i]);
                    }
                    catch (ex) {
                        throw new cmderror_1.CmdError(`Failed to parse value for parameter: ${paramName}`, { param, commandData });
                    }
                    newArgs.push(parsedValue);
                }
                else {
                    newArgs.push(arg);
                }
                // Check if is a valid type ...
            }
            return method === null || method === void 0 ? void 0 : method.apply(this, newArgs);
        };
        commandsInsideClass.push(commandData);
        // CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata(metadatasymbols_1.METADATAKEY.COMMAND, commandsInsideClass, target);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}
exports.Command = Command;
/**
 *
 *
 * @param {*} value
 * @param {Function} expectedType
 * @returns {unknown}
 * @throws {CmdError<unknown>}
 */
function parseToType(value, expectedType) {
    if ((typeof value) === expectedType.name) {
        return value;
    }
    let result;
    switch (expectedType) {
        case String:
            return String(value);
        case Number:
            result = parseInt(value, 10);
            break;
        case Boolean:
            if (value === "true" || value === "1") {
                result = true;
            }
            else if (value === "false" || value === "0") {
                result = false;
            }
            break;
        default:
            throw new cmderror_1.CmdError(`Invalid type to parse: ${expectedType.name}`, { value, expectedType: expectedType.name });
    }
    const invalidValuesList = [null, Infinity, undefined]; // NaN not included beacuse (NaN === NaN) = false (wp JavaScript types!)
    if (Number.isNaN(result) || invalidValuesList.indexOf(result) >= 1) {
        throw new cmderror_1.CmdError(`Not allowed value: ${value}`, { value, expectedType: expectedType.name });
    }
    return result;
}
function getFunctionArgumentsNames(func) {
    return (`${func}`)
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]
}
//# sourceMappingURL=command.decorator.js.map