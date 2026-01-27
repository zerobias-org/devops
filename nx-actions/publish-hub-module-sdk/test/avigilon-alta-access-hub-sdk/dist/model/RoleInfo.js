import { ObjectSerializer } from './index.js';
/**
* Role with detailed information
*/
export class RoleInfo {
    /**
    * Role identifier
    */
    'id';
    /**
    * Role name
    */
    'name';
    /**
    * Role description
    */
    'description';
    /**
    * Whether role can be edited
    */
    'isEditable';
    /**
    * Whether role is site-specific
    */
    'isSiteSpecific';
    /**
    * Whether MFA is required for this role
    */
    'isMfaRequired';
    /**
    * Number of users with this role
    */
    'userCount';
    /**
    * Sites associated with the role
    */
    'sites';
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
            "name": "isEditable",
            "baseName": "isEditable",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isSiteSpecific",
            "baseName": "isSiteSpecific",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isMfaRequired",
            "baseName": "isMfaRequired",
            // false
            // boolean
            // boolean
            "type": "boolean",
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
            "name": "sites",
            "baseName": "sites",
            // false
            // Array&lt;SiteSummary&gt;
            // Array&lt;SiteSummary&gt;
            "type": "Array<SiteSummary>",
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
        return RoleInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'RoleInfo');
    }
    constructor(id, name, description, isEditable, isSiteSpecific, isMfaRequired, userCount, sites, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isEditable = isEditable;
        this.isSiteSpecific = isSiteSpecific;
        this.isMfaRequired = isMfaRequired;
        this.userCount = userCount;
        this.sites = sites;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
