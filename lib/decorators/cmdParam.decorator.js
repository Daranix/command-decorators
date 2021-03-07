"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdParam = void 0;
require("reflect-metadata");
var metadatasymbols_1 = require("../symbols/metadatasymbols");
// https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators
function CmdParam(_a) {
    var _b = _a === void 0 ? {} : _a, name = _b.name, _c = _b.required, required = _c === void 0 ? true : _c, description = _b.description, _d = _b.customType, customType = _d === void 0 ? false : _d;
    return function (target, propertyKey, parameterIndex) {
        var params = Reflect.getOwnMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, target, propertyKey) || [];
        var type = Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)[parameterIndex];
        var paramData = {
            name: name,
            description: description,
            index: parameterIndex,
            type: type,
            required: required,
            customType: customType
        };
        params[parameterIndex] = paramData;
        Reflect.defineMetadata(metadatasymbols_1.METADATAKEY.PARAMETER, params, target, propertyKey);
    };
}
exports.CmdParam = CmdParam;
//# sourceMappingURL=cmdParam.decorator.js.map