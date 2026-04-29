"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veil = void 0;
class Veil {
    id;
    name;
    description;
    price;
    rentalPrice;
    image;
    category;
    isAvailable;
    sku;
    silhouette;
    neckline;
    fabric;
    trainLength;
    stock;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.price = props.price;
        this.rentalPrice = props.rentalPrice;
        this.image = props.image;
        this.category = props.category;
        this.isAvailable = props.isAvailable ?? true;
        this.sku = props.sku;
        this.silhouette = props.silhouette;
        this.neckline = props.neckline;
        this.fabric = props.fabric;
        this.trainLength = props.trainLength;
        this.stock = props.stock;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }
}
exports.Veil = Veil;
//# sourceMappingURL=veil.entity.js.map