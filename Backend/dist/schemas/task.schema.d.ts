import mongoose, { Document, Types } from 'mongoose';
export type TaskDocument = Task & Document;
export declare class Task {
    title: string;
    description: string;
    status: string;
    userId: Types.ObjectId;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, (mongoose.Document<unknown, any, Task, any, mongoose.DefaultSchemaOptions> & Task & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Task, any, mongoose.DefaultSchemaOptions> & Task & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Task>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, Task, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Task & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: mongoose.SchemaDefinitionProperty<string, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Task & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Task & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: mongoose.SchemaDefinitionProperty<string, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Task & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Task & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Task>;
