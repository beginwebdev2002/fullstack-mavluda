import { HydratedDocument } from 'mongoose';
export type BookingDocument = HydratedDocument<BookingSchemaEntity>;
export declare class BookingSchemaEntity {
    customerName: string;
    date: Date;
    status: string;
}
export declare const BookingSchema: import("mongoose").Schema<BookingSchemaEntity, import("mongoose").Model<BookingSchemaEntity, any, any, any, (import("mongoose").Document<unknown, any, BookingSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & BookingSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, BookingSchemaEntity, any, import("mongoose").DefaultSchemaOptions> & BookingSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, BookingSchemaEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BookingSchemaEntity, import("mongoose").Document<unknown, {}, BookingSchemaEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BookingSchemaEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    customerName?: import("mongoose").SchemaDefinitionProperty<string, BookingSchemaEntity, import("mongoose").Document<unknown, {}, BookingSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BookingSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    date?: import("mongoose").SchemaDefinitionProperty<Date, BookingSchemaEntity, import("mongoose").Document<unknown, {}, BookingSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BookingSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, BookingSchemaEntity, import("mongoose").Document<unknown, {}, BookingSchemaEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<BookingSchemaEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, BookingSchemaEntity>;
