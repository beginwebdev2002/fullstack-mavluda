"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
class Booking {
    id;
    customerName;
    date;
    status;
    createdAt;
    updatedAt;
    constructor(id, customerName, date, status, createdAt, updatedAt) {
        this.id = id;
        this.customerName = customerName;
        this.date = date;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map