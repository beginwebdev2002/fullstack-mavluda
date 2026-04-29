import { HydratedDocument } from 'mongoose';
export type InventoryDocument = HydratedDocument<InventorySchemaEntity>;
export declare class InventorySchemaEntity {
    itemName: string;
    quantity: number;
    location: string;
}
export declare const InventorySchema: import("mongoose").Schema<InventorySchemaEntity, import("mongoose").Model<InventorySchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, InventorySchemaEntity, any, import("mongoose").DefaultSchemaOptions> & InventorySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, InventorySchemaEntity, any, import("mongoose").DefaultSchemaOptions> & InventorySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, InventorySchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventorySchemaEntity, import("mongoose").Document<unknown, {}, InventorySchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventorySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    itemName?: import("mongoose").SchemaDefinitionProperty<string, InventorySchemaEntity, import("mongoose").Document<unknown, {}, InventorySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventorySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, InventorySchemaEntity, import("mongoose").Document<unknown, {}, InventorySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventorySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, InventorySchemaEntity, import("mongoose").Document<unknown, {}, InventorySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<InventorySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, InventorySchemaEntity>;
