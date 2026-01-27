import { PictureInfo } from './PictureInfo.js';
/**
* Picture/photo associated with a user
*/
export declare class UserPicture {
    /**
    * Picture identifier
    */
    'id': string;
    /**
    * Whether this picture is the user\'s avatar
    */
    'isAvatar'?: boolean;
    /**
    * Timestamp when picture was uploaded
    */
    'createdAt'?: Date;
    /**
    * Timestamp when picture was last updated
    */
    'updatedAt'?: Date;
    'picture'?: PictureInfo;
    static readonly discriminator: string | undefined;
    static attributeTypeMap: ReadonlyArray<{
        name: string;
        baseName: string;
        type: string;
        format: string;
    }>;
    static getAttributeTypeMap(): readonly {
        name: string;
        baseName: string;
        type: string;
        format: string;
    }[];
    static newInstance(obj: any): UserPicture;
    constructor(id: string, isAvatar?: boolean, createdAt?: Date, updatedAt?: Date, picture?: PictureInfo);
}
