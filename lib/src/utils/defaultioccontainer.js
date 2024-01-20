"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultIocContainer = void 0;
class DefaultIocContainer {
    constructor() {
        this.mapContainer = new Map();
    }
    get(identifier) {
        if (!this.mapContainer.has(identifier)) {
            throw new Error(`Unable to find element with identifier ${identifier} on the IoC container`);
        }
        return this.mapContainer.get(identifier);
    }
    bind(type, identifier) {
        if (this.mapContainer.has(identifier)) {
            throw new Error(`Failed to construct singleton with identifier: ${identifier} already exists`);
        }
        this.mapContainer.set(identifier, new type());
    }
}
exports.DefaultIocContainer = DefaultIocContainer;
//# sourceMappingURL=defaultioccontainer.js.map