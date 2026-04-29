import { CreatePartnershipDto } from './create-partnership.dto';
declare const UpdatePartnershipDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePartnershipDto>>;
export declare class UpdatePartnershipDto extends UpdatePartnershipDto_base {
    status?: 'active' | 'inactive';
}
export {};
