export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl?: string;
    role?: 'user' | 'admin';
    phone?: string;
    password: string;
}
