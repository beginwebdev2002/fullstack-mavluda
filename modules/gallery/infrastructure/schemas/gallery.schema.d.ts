import { HydratedDocument } from 'mongoose';
export type GalleryDocument = HydratedDocument<GallerySchemaEntity>;
export declare class GallerySchemaEntity {
    title: string;
    imageUrl: string;
    category: string;
    status: string;
    alt: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const GallerySchema: import("mongoose").Schema<GallerySchemaEntity, import("mongoose").Model<GallerySchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, GallerySchemaEntity, any, import("mongoose").DefaultSchemaOptions> & GallerySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, GallerySchemaEntity, any, import("mongoose").DefaultSchemaOptions> & GallerySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, GallerySchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    alt?: import("mongoose").SchemaDefinitionProperty<string, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, GallerySchemaEntity, import("mongoose").Document<unknown, {}, GallerySchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<GallerySchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, GallerySchemaEntity>;
