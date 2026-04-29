"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    firstName;
    telegramId;
    email;
    passwordHash;
    lastName;
    username;
    photoUrl;
    role;
    createdAt;
    constructor(id, firstName, telegramId, email, passwordHash, lastName, username, photoUrl, role = 'user', createdAt = new Date()) {
        this.id = id;
        this.firstName = firstName;
        this.telegramId = telegramId;
        this.email = email;
        this.passwordHash = passwordHash;
        this.lastName = lastName;
        this.username = username;
        this.photoUrl = photoUrl;
        this.role = role;
        this.createdAt = createdAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map