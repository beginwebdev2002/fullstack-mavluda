"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treatments = void 0;
class Treatments {
    id;
    name;
    description;
    price;
    duration;
    category;
    imageUrl;
    active;
    createdAt;
    updatedAt;
    constructor(id, name, description, price, duration, category, imageUrl, active = true, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.category = category;
        this.imageUrl = imageUrl;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Treatments = Treatments;
//# sourceMappingURL=treatments.entity.js.map