import { ObjectSerializer } from './index.js';
export class GroupInfo {
    /**
    * Unique identifier for the group
    */
    'id';
    /**
    * Name of the group
    */
    'name';
    /**
    * Description of the group
    */
    'description';
    /**
    * Number of users in the group
    */
    'userCount';
    /**
    * Badge configuration for the group
    */
    'badgeConfig';
    /**
    * Timestamp when group was created
    */
    'createdAt';
    /**
    * Timestamp when group was last updated
    */
    'updatedAt';
    /**
    * Organization ID the group belongs to
    */
    'organizationId';
    /**
    * Parent group ID if this is a child group
    */
    'parentGroupId';
    /**
    * List of permissions assigned to the group
    */
    'permissions';
    /**
    * Access rules for the group
    */
    'accessRules';
    /**
    * Custom field values for the group
    */
    'customFields';
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
            "name": "name",
            "baseName": "name",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userCount",
            "baseName": "userCount",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "badgeConfig",
            "baseName": "badgeConfig",
            // false
            // object
            // object
            "type": "object",
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
            "name": "organizationId",
            "baseName": "organizationId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "parentGroupId",
            "baseName": "parentGroupId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
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
            "name": "accessRules",
            "baseName": "accessRules",
            // false
            // Array&lt;AccessRule&gt;
            // Array&lt;AccessRule&gt;
            "type": "Array<AccessRule>",
            "format": ""
        },
        {
            "name": "customFields",
            "baseName": "customFields",
            // false
            // { [key: string]: string; }
            // { [key: string]: string; }
            "type": "{ [key: string]: string; }",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return GroupInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'GroupInfo');
    }
    constructor(id, name, description, userCount, badgeConfig, createdAt, updatedAt, organizationId, parentGroupId, permissions, accessRules, customFields) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userCount = userCount;
        this.badgeConfig = badgeConfig;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.organizationId = organizationId;
        this.parentGroupId = parentGroupId;
        this.permissions = permissions;
        this.accessRules = accessRules;
        this.customFields = customFields;
    }
}
