import { HydratedDocument } from 'mongoose';
export type VeilDocument = HydratedDocument<VeilSchemaEntity>;
export declare class VeilSchemaEntity {
    name: string;
    description: string;
    price: number;
    rentalPrice: number;
    image: string;
    category: string;
    isAvailable: boolean;
    sku: string;
    silhouette: string;
    neckline: string;
    fabric: string;
    trainLength: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const VeilSchema: import("mongoose").Schema<VeilSchemaEntity, import("mongoose").Model<VeilSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, VeilSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & VeilSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, VeilSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & VeilSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, VeilSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rentalPrice?: import("mongoose").SchemaDefinitionProperty<number, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isAvailable?: import("mongoose").SchemaDefinitionProperty<boolean, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sku?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    silhouette?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    neckline?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fabric?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    trainLength?: import("mongoose").SchemaDefinitionProperty<string, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stock?: import("mongoose").SchemaDefinitionProperty<number, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, VeilSchemaEntity, import("mongoose").Document<unknown, {}, VeilSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<VeilSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, VeilSchemaEntity>;
