import { ObjectSerializer } from './index.js';
export class GroupInfoAllOf {
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
        return GroupInfoAllOf.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'GroupInfoAllOf');
    }
    constructor(organizationId, parentGroupId, permissions, accessRules, customFields) {
        this.organizationId = organizationId;
        this.parentGroupId = parentGroupId;
        this.permissions = permissions;
        this.accessRules = accessRules;
        this.customFields = customFields;
    }
}
