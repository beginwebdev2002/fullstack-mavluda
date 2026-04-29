import { HydratedDocument } from 'mongoose';
export type AdminSettingsDocument = HydratedDocument<AdminSettingsSchemaEntity>;
export declare class AdminSettingsSchemaEntity {
    _id: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    socialLinks: Map<string, string>;
    workHours: Map<string, string>;
    ownerInfo: {
        name: string;
        phoneNumber: string;
    };
    biography: string;
    philosophy: string;
    galleryCategories: string[];
    treatmentCategories: string[];
    veilSilhouettes: string[];
    veilFabrics: string[];
    veilTrainLengths: string[];
    veilNecklines: string[];
}
export declare const AdminSettingsSchema: import("mongoose").Schema<AdminSettingsSchemaEntity, import("mongoose").Model<AdminSettingsSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, AdminSettingsSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & AdminSettingsSchemaEntity & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, AdminSettingsSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & AdminSettingsSchemaEntity & Required<{
    _id: string;
}> & {
    __v: number;
}), any, AdminSettingsSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<string, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<{
        address: string;
        latitude: number;
        longitude: number;
    }, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    socialLinks?: import("mongoose").SchemaDefinitionProperty<Map<string, string>, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    workHours?: import("mongoose").SchemaDefinitionProperty<Map<string, string>, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ownerInfo?: import("mongoose").SchemaDefinitionProperty<{
        name: string;
        phoneNumber: string;
    }, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    biography?: import("mongoose").SchemaDefinitionProperty<string, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    philosophy?: import("mongoose").SchemaDefinitionProperty<string, AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    galleryCategories?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    treatmentCategories?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    veilSilhouettes?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    veilFabrics?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    veilTrainLengths?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    veilNecklines?: import("mongoose").SchemaDefinitionProperty<string[], AdminSettingsSchemaEntity, import("mongoose").Document<unknown, {}, AdminSettingsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<AdminSettingsSchemaEntity & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AdminSettingsSchemaEntity>;
