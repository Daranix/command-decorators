"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionArgumentsNames = getFunctionArgumentsNames;
function getFunctionArgumentsNames(func) {
    return (`${func}`)
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
        .replace(/=[^,]+/g, '') // strip any ES6 defaults  
        .split(',').filter(Boolean); // split & filter [""]
}
//# sourceMappingURL=funcs.js.map