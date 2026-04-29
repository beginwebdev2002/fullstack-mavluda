import { HydratedDocument } from 'mongoose';
export type PartnershipDocument = HydratedDocument<PartnershipSchemaEntity>;
export declare class PartnershipSchemaEntity {
    partnerName: string;
    contactEmail: string;
    type: string;
    status: string;
}
export declare const PartnershipSchema: import("mongoose").Schema<PartnershipSchemaEntity, import("mongoose").Model<PartnershipSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, PartnershipSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & PartnershipSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, PartnershipSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & PartnershipSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, PartnershipSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PartnershipSchemaEntity, import("mongoose").Document<unknown, {}, PartnershipSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PartnershipSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    partnerName?: import("mongoose").SchemaDefinitionProperty<string, PartnershipSchemaEntity, import("mongoose").Document<unknown, {}, PartnershipSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PartnershipSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contactEmail?: import("mongoose").SchemaDefinitionProperty<string, PartnershipSchemaEntity, import("mongoose").Document<unknown, {}, PartnershipSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PartnershipSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, PartnershipSchemaEntity, import("mongoose").Document<unknown, {}, PartnershipSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PartnershipSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, PartnershipSchemaEntity, import("mongoose").Document<unknown, {}, PartnershipSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<PartnershipSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, PartnershipSchemaEntity>;
