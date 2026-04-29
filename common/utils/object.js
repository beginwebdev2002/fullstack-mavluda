"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperties = deleteProperties;
function deleteProperties(object, properties) {
    const newObject = { ...object };
    properties.forEach((property) => {
        if (!newObject[property]) {
            return;
        }
        delete newObject[property];
    });
    return newObject;
}
//# sourceMappingURL=object.js.map