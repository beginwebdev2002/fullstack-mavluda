"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    firstName;
    email;
    passwordHash;
    lastName;
    username;
    photoUrl;
    phone;
    role;
    createdAt;
    constructor(id, firstName, email, passwordHash, lastName, username, photoUrl, phone, role = 'user', createdAt = new Date()) {
        this.id = id;
        this.firstName = firstName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.lastName = lastName;
        this.username = username;
        this.photoUrl = photoUrl;
        this.phone = phone;
        this.role = role;
        this.createdAt = createdAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map