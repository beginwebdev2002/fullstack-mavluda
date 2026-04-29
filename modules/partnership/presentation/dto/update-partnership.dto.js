"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnershipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_partnership_dto_1 = require("./create-partnership.dto");
class UpdatePartnershipDto extends (0, mapped_types_1.PartialType)(create_partnership_dto_1.CreatePartnershipDto) {
    status;
}
exports.UpdatePartnershipDto = UpdatePartnershipDto;
//# sourceMappingURL=update-partnership.dto.js.map