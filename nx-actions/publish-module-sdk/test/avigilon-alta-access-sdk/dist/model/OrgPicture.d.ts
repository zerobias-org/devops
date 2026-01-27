import { PictureInfo } from './PictureInfo.js';
/**
* Organization picture
*/
export declare class OrgPicture {
    /**
    * Picture identifier
    */
    'id': number;
    /**
    * Whether this is an avatar image
    */
    'isAvatar'?: boolean;
    'picture'?: PictureInfo;
    /**
    * Upload timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): OrgPicture;
    constructor(id: number, isAvatar?: boolean, picture?: PictureInfo, createdAt?: Date, updatedAt?: Date);
}
