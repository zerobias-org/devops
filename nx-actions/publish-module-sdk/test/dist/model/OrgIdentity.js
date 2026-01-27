import { ObjectSerializer } from './index.js';
/**
* Organization identity
*/
export class OrgIdentity {
    /**
    * Identity identifier
    */
    'id';
    /**
    * Email address
    */
    'email';
    /**
    * First name
    */
    'firstName';
    /**
    * Last name
    */
    'lastName';
    /**
    * Phone number
    */
    'phoneNumber';
    /**
    * Avatar URL
    */
    'avatarUrl';
    /**
    * Whether identity is verified
    */
    'isVerified';
    /**
    * Creation timestamp
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
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "email",
            "baseName": "email",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
        },
        {
            "name": "firstName",
            "baseName": "firstName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "lastName",
            "baseName": "lastName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "phoneNumber",
            "baseName": "phoneNumber",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "avatarUrl",
            "baseName": "avatarUrl",
            // false
            // URL
            // URL
            "type": "URL",
            "format": "url"
        },
        {
            "name": "isVerified",
            "baseName": "isVerified",
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
        }
    ];
    static getAttributeTypeMap() {
        return OrgIdentity.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'OrgIdentity');
    }
    constructor(id, email, firstName, lastName, phoneNumber, avatarUrl, isVerified, createdAt, updatedAt) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.avatarUrl = avatarUrl;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
