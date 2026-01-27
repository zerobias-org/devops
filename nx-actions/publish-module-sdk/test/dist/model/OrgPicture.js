import { ObjectSerializer } from './index.js';
/**
* Organization picture
*/
export class OrgPicture {
    /**
    * Picture identifier
    */
    'id';
    /**
    * Whether this is an avatar image
    */
    'isAvatar';
    'picture';
    /**
    * Upload timestamp
    */
    'createdAt';
    /**
    * Last update timestamp
    */
    'updatedAt';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // number
            // number
            "type": "number",
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
            "name": "picture",
            "baseName": "picture",
            // false
            // PictureInfo
            // PictureInfo
            "type": "PictureInfo",
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
        }
    ];
    static getAttributeTypeMap() {
        return OrgPicture.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'OrgPicture');
    }
    constructor(id, isAvatar, picture, createdAt, updatedAt) {
        this.id = id;
        this.isAvatar = isAvatar;
        this.picture = picture;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
