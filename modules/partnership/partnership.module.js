"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnershipModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const partnership_service_1 = require("./application/partnership.service");
const partnership_controller_1 = require("./presentation/partnership.controller");
const partnership_repository_1 = require("./infrastructure/repositories/partnership.repository");
const partnership_schema_1 = require("./infrastructure/schemas/partnership.schema");
let PartnershipModule = class PartnershipModule {
};
exports.PartnershipModule = PartnershipModule;
exports.PartnershipModule = PartnershipModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: partnership_schema_1.PartnershipSchemaEntity.name, schema: partnership_schema_1.PartnershipSchema },
            ]),
        ],
        controllers: [partnership_controller_1.PartnershipController],
        providers: [partnership_service_1.PartnershipService, partnership_repository_1.PartnershipRepository],
        exports: [partnership_service_1.PartnershipService],
    })
], PartnershipModule);
//# sourceMappingURL=partnership.module.js.map