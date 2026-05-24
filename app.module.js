"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const admin_settings_1 = require("./modules/admin-settings");
const auth_1 = require("./modules/auth");
const booking_1 = require("./modules/booking");
const gallery_1 = require("./modules/gallery");
const inventory_1 = require("./modules/inventory");
const partnership_1 = require("./modules/partnership");
const payment_1 = require("./modules/payment");
const treatments_1 = require("./modules/treatments");
const user_1 = require("./modules/user");
const veil_1 = require("./modules/veil");
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("./common/config");
const database_1 = require("./common/database");
const seed_1 = require("./common/seed");
let AppModule = class AppModule {
    constructor() { }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.AppConfigModule,
            database_1.DatabaseModule,
            seed_1.SeedModule,
            user_1.UserModule,
            admin_settings_1.AdminSettingsModule,
            veil_1.VeilModule,
            treatments_1.TreatmentsModule,
            gallery_1.GalleryModule,
            auth_1.AuthModule,
            payment_1.PaymentModule,
            booking_1.BookingModule,
            inventory_1.InventoryModule,
            partnership_1.PartnershipModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map