import { ObjectSerializer } from './index.js';
/**
* User shared from another organization
*/
export class SharedUser {
    /**
    * Shared user identifier
    */
    'id';
    /**
    * User identifier
    */
    'userId';
    'user';
    /**
    * Organization ID the user is shared from
    */
    'sharedFromOrgId';
    'sharedFromOrg';
    /**
    * Timestamp when user was shared
    */
    'sharedAt';
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
            "name": "userId",
            "baseName": "userId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "user",
            "baseName": "user",
            // false
            // SharedUserUser
            // SharedUserUser
            "type": "SharedUserUser",
            "format": ""
        },
        {
            "name": "sharedFromOrgId",
            "baseName": "sharedFromOrgId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "sharedFromOrg",
            "baseName": "sharedFromOrg",
            // false
            // SharedUserSharedFromOrg
            // SharedUserSharedFromOrg
            "type": "SharedUserSharedFromOrg",
            "format": ""
        },
        {
            "name": "sharedAt",
            "baseName": "sharedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        }
    ];
    static getAttributeTypeMap() {
        return SharedUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'SharedUser');
    }
    constructor(id, userId, user, sharedFromOrgId, sharedFromOrg, sharedAt) {
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.sharedFromOrgId = sharedFromOrgId;
        this.sharedFromOrg = sharedFromOrg;
        this.sharedAt = sharedAt;
    }
}
