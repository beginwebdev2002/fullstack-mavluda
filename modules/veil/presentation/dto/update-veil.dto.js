"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVeilDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_veil_dto_1 = require("./create-veil.dto");
class UpdateVeilDto extends (0, mapped_types_1.PartialType)(create_veil_dto_1.CreateVeilDto) {
}
exports.UpdateVeilDto = UpdateVeilDto;
//# sourceMappingURL=update-veil.dto.js.map