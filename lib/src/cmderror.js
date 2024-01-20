"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdError = void 0;
class CmdError extends Error {
    constructor(message, detail) {
        super(message);
        this.detail = detail;
    }
}
exports.CmdError = CmdError;
//# sourceMappingURL=cmderror.js.map