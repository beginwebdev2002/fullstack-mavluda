"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partnership = void 0;
class Partnership {
    id;
    partnerName;
    contactEmail;
    type;
    status;
    createdAt;
    constructor(id, partnerName, contactEmail, type, status, createdAt) {
        this.id = id;
        this.partnerName = partnerName;
        this.contactEmail = contactEmail;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.Partnership = Partnership;
//# sourceMappingURL=partnership.entity.js.map