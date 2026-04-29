export declare class User {
    readonly id: string;
    readonly firstName: string;
    readonly telegramId?: number | undefined;
    readonly email?: string | undefined;
    readonly passwordHash?: string | undefined;
    readonly lastName?: string | undefined;
    readonly username?: string | undefined;
    readonly photoUrl?: string | undefined;
    readonly role: 'user' | 'admin';
    readonly createdAt: Date;
    constructor(id: string, firstName: string, telegramId?: number | undefined, email?: string | undefined, passwordHash?: string | undefined, lastName?: string | undefined, username?: string | undefined, photoUrl?: string | undefined, role?: 'user' | 'admin', createdAt?: Date);
}
