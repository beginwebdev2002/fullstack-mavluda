"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const treatments_service_1 = require("./application/treatments.service");
const treatments_controller_1 = require("./presentation/treatments.controller");
const treatments_repository_1 = require("./infrastructure/repositories/treatments.repository");
const treatments_schema_1 = require("./infrastructure/schemas/treatments.schema");
let TreatmentsModule = class TreatmentsModule {
};
exports.TreatmentsModule = TreatmentsModule;
exports.TreatmentsModule = TreatmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: treatments_schema_1.TreatmentsSchemaEntity.name, schema: treatments_schema_1.TreatmentsSchema },
            ]),
        ],
        controllers: [treatments_controller_1.TreatmentsController],
        providers: [treatments_service_1.TreatmentsService, treatments_repository_1.TreatmentsRepository],
        exports: [treatments_service_1.TreatmentsService],
    })
], TreatmentsModule);
//# sourceMappingURL=treatments.module.js.map