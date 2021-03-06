"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultIocContainer = void 0;
var DefaultIocContainer = /** @class */ (function () {
    function DefaultIocContainer() {
        this.mapContainer = new Map();
    }
    DefaultIocContainer.prototype.get = function (identifier) {
        if (!this.mapContainer.has(identifier)) {
            throw new Error("Unable to find element with identifier " + identifier + " on the IoC container");
        }
        return this.mapContainer.get(identifier);
    };
    DefaultIocContainer.prototype.bind = function (type, identifier) {
        if (this.mapContainer.has(identifier)) {
            throw new Error("Failed to construct singleton with identifier: " + identifier + " already exists");
        }
        this.mapContainer.set(identifier, new type());
    };
    return DefaultIocContainer;
}());
exports.DefaultIocContainer = DefaultIocContainer;
//# sourceMappingURL=defaultioccontainer.js.map