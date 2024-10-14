import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User>;
