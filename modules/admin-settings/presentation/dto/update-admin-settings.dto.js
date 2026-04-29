"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminSettingsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_admin_settings_dto_1 = require("./create-admin-settings.dto");
class UpdateAdminSettingsDto extends (0, mapped_types_1.PartialType)(create_admin_settings_dto_1.CreateAdminSettingsDto) {
}
exports.UpdateAdminSettingsDto = UpdateAdminSettingsDto;
//# sourceMappingURL=update-admin-settings.dto.js.map