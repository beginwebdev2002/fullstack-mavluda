import { User } from '../domain/user.entity';
import { UserRepository } from '../infrastructure/repositories/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    count(): Promise<number>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findOrCreate(telegramId: number, profile: {
        firstName: string;
        lastName?: string;
        username?: string;
        photoUrl?: string;
    }): Promise<User>;
    create(user: Omit<User, 'id' | 'createdAt'> & {
        password?: string;
    }): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: Partial<User> & {
        password?: string;
    }): Promise<User>;
    remove(id: string): Promise<void>;
}
