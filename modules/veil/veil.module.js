"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeilModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const veil_service_1 = require("./application/veil.service");
const veil_controller_1 = require("./presentation/veil.controller");
const veil_repository_1 = require("./infrastructure/repositories/veil.repository");
const veil_schema_1 = require("./infrastructure/schemas/veil.schema");
let VeilModule = class VeilModule {
};
exports.VeilModule = VeilModule;
exports.VeilModule = VeilModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: veil_schema_1.VeilSchemaEntity.name, schema: veil_schema_1.VeilSchema },
            ]),
        ],
        controllers: [veil_controller_1.VeilController],
        providers: [veil_service_1.VeilService, veil_repository_1.VeilRepository],
        exports: [veil_service_1.VeilService],
    })
], VeilModule);
//# sourceMappingURL=veil.module.js.map