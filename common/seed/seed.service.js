"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../modules/user");
const app_config_service_1 = require("../config/app-config.service");
const bcrypt = __importStar(require("bcrypt"));
let SeedService = SeedService_1 = class SeedService {
    userService;
    configService;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    async onModuleInit() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        try {
            const email = this.configService.adminEmail;
            const password = this.configService.adminPassword;
            if (!email || !password) {
                this.logger.warn('Admin credentials not provided in environment variables. Skipping admin seeding.');
                return;
            }
            const existingAdmin = await this.userService.findByEmail(email);
            if (existingAdmin) {
                this.logger.log('Admin user already exists.');
                return;
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            await this.userService.create({
                firstName: 'Admin',
                lastName: 'Mavluda Beauty',
                email,
                passwordHash,
                role: 'admin',
            });
            this.logger.log(`Admin user seeded successfully with email: ${email}`);
        }
        catch (error) {
            this.logger.error('Failed to seed admin user', error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_1.UserService,
        app_config_service_1.AppConfigService])
], SeedService);
//# sourceMappingURL=seed.service.js.map