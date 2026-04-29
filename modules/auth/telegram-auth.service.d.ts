import { AppConfigService } from '@common/config/app-config.service';
import { UserService } from '@modules/user';
import { User } from '@modules/user';
export declare class TelegramAuthService {
    private readonly configService;
    private readonly userService;
    constructor(configService: AppConfigService, userService: UserService);
    validateInitData(initData: string): Promise<User>;
}
