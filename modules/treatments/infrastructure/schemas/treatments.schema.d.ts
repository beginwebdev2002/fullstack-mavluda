import { HydratedDocument } from 'mongoose';
export type TreatmentsDocument = HydratedDocument<TreatmentsSchemaEntity>;
export declare class TreatmentsSchemaEntity {
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    imageUrl: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const TreatmentsSchema: import("mongoose").Schema<TreatmentsSchemaEntity, import("mongoose").Model<TreatmentsSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, TreatmentsSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & TreatmentsSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, TreatmentsSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & TreatmentsSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, TreatmentsSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    active?: import("mongoose").SchemaDefinitionProperty<boolean, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, TreatmentsSchemaEntity, import("mongoose").Document<unknown, {}, TreatmentsSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TreatmentsSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TreatmentsSchemaEntity>;
