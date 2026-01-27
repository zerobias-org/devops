import { ObjectSerializer } from './index.js';
/**
* Picture/photo associated with a user
*/
export class UserPicture {
    /**
    * Picture identifier
    */
    'id';
    /**
    * Whether this picture is the user's avatar
    */
    'isAvatar';
    /**
    * Timestamp when picture was uploaded
    */
    'createdAt';
    /**
    * Timestamp when picture was last updated
    */
    'updatedAt';
    'picture';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "isAvatar",
            "baseName": "isAvatar",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "updatedAt",
            "baseName": "updatedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "picture",
            "baseName": "picture",
            // false
            // PictureInfo
            // PictureInfo
            "type": "PictureInfo",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserPicture.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserPicture');
    }
    constructor(id, isAvatar, createdAt, updatedAt, picture) {
        this.id = id;
        this.isAvatar = isAvatar;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.picture = picture;
    }
}
