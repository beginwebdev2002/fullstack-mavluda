import { OnModuleInit } from '@nestjs/common';
import { UserService } from '@modules/user';
import { AppConfigService } from '@common/config/app-config.service';
export declare class SeedService implements OnModuleInit {
    private readonly userService;
    private readonly configService;
    private readonly logger;
    constructor(userService: UserService, configService: AppConfigService);
    onModuleInit(): Promise<void>;
    private seedAdminUser;
}
