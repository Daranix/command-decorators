"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdParam = CmdParam;
require("reflect-metadata");
const metadatasymbols_1 = require("../symbols/metadatasymbols");
const funcs_1 = require("../utils/funcs");
// https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
function CmdParam({ name, required = true, description, customType = false } = {}) {
    return (target, propertyKey, parameterIndex) => {
        const params = Reflect.getMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, target, propertyKey) || [];
        const type = Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex];
        const classDefinition = target;
        const func = classDefinition[propertyKey];
        name = name || (0, funcs_1.getFunctionArgumentsNames)(func)[parameterIndex];
        const paramData = {
            name,
            description,
            index: parameterIndex,
            type,
            required,
            customType
        };
        params[parameterIndex] = paramData;
        Reflect.defineMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, params, target, propertyKey);
    };
}
//# sourceMappingURL=cmdParam.decorator.js.map