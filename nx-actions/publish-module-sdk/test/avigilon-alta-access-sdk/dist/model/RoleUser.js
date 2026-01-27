import { ObjectSerializer } from './index.js';
/**
* User assigned to a role
*/
export class RoleUser {
    /**
    * User identifier
    */
    'id';
    /**
    * User status
    */
    'status';
    'identity';
    /**
    * Timestamp when role was assigned to user
    */
    'assignedAt';
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
            "name": "status",
            "baseName": "status",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "identity",
            "baseName": "identity",
            // false
            // UserIdentity
            // UserIdentity
            "type": "UserIdentity",
            "format": ""
        },
        {
            "name": "assignedAt",
            "baseName": "assignedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        }
    ];
    static getAttributeTypeMap() {
        return RoleUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'RoleUser');
    }
    constructor(id, status, identity, assignedAt) {
        this.id = id;
        this.status = status;
        this.identity = identity;
        this.assignedAt = assignedAt;
    }
}
