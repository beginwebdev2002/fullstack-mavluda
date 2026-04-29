import { UserService } from '../application/user.service';
import { User } from '@modules/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from '@common/interfaces/authenticated-request.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<User>;
    count(): Promise<number>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<User>;
    remove(id: string): Promise<void>;
    getProfile(req: AuthenticatedRequest): Promise<User>;
}
