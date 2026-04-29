"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
    id;
    itemName;
    quantity;
    location;
    lastUpdated;
    constructor(id, itemName, quantity, location, lastUpdated) {
        this.id = id;
        this.itemName = itemName;
        this.quantity = quantity;
        this.location = location;
        this.lastUpdated = lastUpdated;
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.entity.js.map