import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<UserSchemaEntity>;
export declare class UserSchemaEntity {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl: string;
    phone: string;
    role: string;
}
export declare const UserSchema: import("mongoose").Schema<UserSchemaEntity, import("mongoose").Model<UserSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, UserSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & UserSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, UserSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & UserSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, UserSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    passwordHash?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    firstName?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    username?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    photoUrl?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, UserSchemaEntity, import("mongoose").Document<unknown, {}, UserSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<UserSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, UserSchemaEntity>;
