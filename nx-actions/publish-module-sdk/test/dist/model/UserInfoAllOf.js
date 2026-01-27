import { ObjectSerializer } from './index.js';
export class UserInfoAllOf {
    /**
    * Organization ID the user belongs to
    */
    'organizationId';
    /**
    * URL to user's avatar image
    */
    'avatarUrl';
    /**
    * Timestamp of user's last login
    */
    'lastLoginAt';
    /**
    * List of user permissions
    */
    'permissions';
    /**
    * Custom field values for the user
    */
    'customFields';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "organizationId",
            "baseName": "organizationId",
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
            "name": "lastLoginAt",
            "baseName": "lastLoginAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "permissions",
            "baseName": "permissions",
            // false
            // Array&lt;string&gt;
            // Array&lt;string&gt;
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "customFields",
            "baseName": "customFields",
            // false
            // Array&lt;UserCustomField&gt;
            // Array&lt;UserCustomField&gt;
            "type": "Array<UserCustomField>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserInfoAllOf.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserInfoAllOf');
    }
    constructor(organizationId, avatarUrl, lastLoginAt, permissions, customFields) {
        this.organizationId = organizationId;
        this.avatarUrl = avatarUrl;
        this.lastLoginAt = lastLoginAt;
        this.permissions = permissions;
        this.customFields = customFields;
    }
}
