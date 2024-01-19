import { ICommand, ICommandParameter } from "../interfaces/commandInterfaces";
import "reflect-metadata";
import { METADATAKEY } from "../symbols/metadatasymbols";
import { CmdError } from "../cmderror";

// https://gist.github.com/RomkeVdMeulen/e45ee89ce848e7fda140635a4d29892b

export function Command(name: string, commandInfo?: { description: string }) {
    console.log("Command(): evaluated");
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const commandsInsideClass = Reflect.getOwnMetadata(METADATAKEY.COMMAND, target) as Array<ICommand> || [];
        const parameters: Array<ICommandParameter> = Reflect.getOwnMetadata(METADATAKEY.PARAMETER, target, propertyKey);

        const f: Function = target[propertyKey];
        const paramLength = f.length;
        const paramTypes: Function[] = Reflect.getOwnMetadata("design:paramtypes", target, propertyKey);
        const paramNames = getFunctionArgumentsNames(f);

        for (let i = 0; i < paramLength; i++) {
            if(!parameters[i]) {
               parameters[i] = {
                   name: paramNames[i],
                   index: i,
                   required: true,
                   type: paramTypes[i]
               } 
            }

            if(!parameters[i].name) { // Asign default name
                parameters[i].name = paramNames[i];
            }
        }

        const commandData: ICommand = {
            description: commandInfo?.description,
            // This will be filled when apply the IoC instance
            action: () => { throw new Error("This command not was initialized") },
            propertyKey,
            command: name,
            parameters: parameters
        };

        const method = descriptor?.value;
        const validParamTypes = ['boolean', 'string', 'number'];

        descriptor.value = function (...args: []) {
            const newArgs = [];
            for (let i = 0; i < paramLength; i++) {
                const arg = args[i];
                const param = parameters.find((p) => p.index === i);
                const paramName = param?.name;
                if(!param?.customType) {
                    if (validParamTypes.indexOf(typeof arg) < 0 && param?.required) {
                        throw new Error(`Invalid parameter type on: ${paramName}`);
                    }
                    let parsedValue: unknown;
                    // eslint-disable-next-line no-useless-catch
                    try {
                        parsedValue = parseToType(arg, paramTypes[i]);
                    } catch(ex) {
                        throw new CmdError(`Failed to parse value for parameter: ${paramName}`, { param, commandData });
                    }
                    newArgs.push(parsedValue);
                } else {
                    newArgs.push(arg);
                }

                // Check if is a valid type ...
            }
            return method?.apply(this, newArgs);
        };

        commandsInsideClass.push(commandData);
        // CommandManager.registerCommand(name, commandData);
        Reflect.defineMetadata(METADATAKEY.COMMAND, commandsInsideClass, target);
        // CommandManager.registerCommandIntoCategory(target._categoryId, commandData);
    };
}

/**
 *
 * 
 * @param {*} value
 * @param {Function} expectedType
 * @returns {unknown}
 * @throws {CmdError<unknown>}
 */
function parseToType(value: any, expectedType: Function): unknown {

    if((typeof value) === expectedType.name) {
        return value;
    }

    let result: any;
    switch(expectedType) {
        case String:
            return String(value);
        case Number:
            result = parseInt(value, 10);
            break;
        case Boolean:
            if(value === "true" || value === "1") {
                result = true;
            } else if(value === "false" || value === "0") {
                result = false;
            } 
            break;
        default:
            throw new CmdError(`Invalid type to parse: ${expectedType.name}`, { value, expectedType: expectedType.name });
    }

    const invalidValuesList = [null, Infinity, undefined]; // NaN not included beacuse (NaN === NaN) = false (wp JavaScript types!)

    if(Number.isNaN(result) || invalidValuesList.indexOf(result) >= 1) {
        throw new CmdError(`Not allowed value: ${value}`, { value, expectedType: expectedType.name });
    }

    return result;
}

function getFunctionArgumentsNames(func: Function): string[] {
    return (`${func}`)
          .replace(/[/][/].*$/mg, '') // strip single-line comments
          .replace(/\s+/g, '') // strip white space
          .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
          .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
          .replace(/=[^,]+/g, '') // strip any ES6 defaults  
          .split(',').filter(Boolean); // split & filter [""]
}