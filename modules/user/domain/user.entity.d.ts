export declare class User {
    readonly id: string;
    readonly firstName: string;
    readonly email?: string | undefined;
    readonly passwordHash?: string | undefined;
    readonly lastName?: string | undefined;
    readonly username?: string | undefined;
    readonly photoUrl?: string | undefined;
    readonly phone?: string | undefined;
    readonly role: 'user' | 'admin';
    readonly createdAt: Date;
    constructor(id: string, firstName: string, email?: string | undefined, passwordHash?: string | undefined, lastName?: string | undefined, username?: string | undefined, photoUrl?: string | undefined, phone?: string | undefined, role?: 'user' | 'admin', createdAt?: Date);
}
