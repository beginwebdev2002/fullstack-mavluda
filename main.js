"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const i18n_exception_filter_1 = require("./common/filters/i18n-exception.filter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const origins = configService.get('FRONTEND_URL');
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: false },
    }));
    app.useGlobalFilters(new i18n_exception_filter_1.I18nExceptionFilter());
    app.enableCors({
        origin: origins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
        maxAge: 3600,
    });
    const PORT = configService.get('port') || 3000;
    const IP = configService.get('IP_ADDRESS') || '0.0.0.0';
    console.log('🚀 ~ bootstrap ~ PORT:', IP, PORT);
    await app.listen(PORT, IP);
}
bootstrap().catch((err) => console.error(err));
//# sourceMappingURL=main.js.map