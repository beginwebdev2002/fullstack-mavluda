import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserDocument } from '../schemas/user.schema';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    count(): Promise<number>;
    findAll(): Promise<User[]>;
    findByTelegramId(telegramId: number): Promise<User | null>;
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    findById(id: string): Promise<User | null>;
    update(id: string, updateData: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<User | null>;
    private toDomain;
}
