"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_treatments_dto_1 = require("./create-treatments.dto");
class UpdateServiceDto extends (0, mapped_types_1.PartialType)(create_treatments_dto_1.CreateServiceDto) {
}
exports.UpdateServiceDto = UpdateServiceDto;
//# sourceMappingURL=update-treatments.dto.js.map