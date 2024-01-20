"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdParam = void 0;
require("reflect-metadata");
const metadatasymbols_1 = require("../symbols/metadatasymbols");
// https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
function CmdParam({ name, required = true, description, customType = false } = {}) {
    return (target, propertyKey, parameterIndex) => {
        const params = Reflect.getOwnMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, target, propertyKey) || [];
        const type = Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)[parameterIndex];
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
exports.CmdParam = CmdParam;
//# sourceMappingURL=cmdParam.decorator.js.map