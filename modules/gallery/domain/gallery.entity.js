"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
class Gallery {
    id;
    title;
    imageUrl;
    category;
    status;
    alt;
    constructor(id, title, imageUrl, category, status = 'draft', alt = '') {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.category = category;
        this.status = status;
        this.alt = alt;
    }
}
exports.Gallery = Gallery;
//# sourceMappingURL=gallery.entity.js.map