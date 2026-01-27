import { ObjectSerializer } from './index.js';
/**
* Identity provider configuration
*/
export class IdentityProvider {
    /**
    * Identity provider identifier
    */
    'id';
    /**
    * Organization ID
    */
    'orgId';
    'identityProviderType';
    /**
    * Whether user sync is enabled
    */
    'isSyncUsersEnabled';
    /**
    * Whether mobile credentials are enabled
    */
    'isMobileCredentialEnabled';
    /**
    * Whether SSO is enabled
    */
    'isSsoEnabled';
    /**
    * Whether mobile SSO is enabled
    */
    'isMobileSsoEnabled';
    /**
    * Last sync timestamp
    */
    'lastSyncedAt';
    /**
    * Provider status
    */
    'status';
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
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "orgId",
            "baseName": "orgId",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "identityProviderType",
            "baseName": "identityProviderType",
            // false
            // IdentityProviderTypeSummary
            // IdentityProviderTypeSummary
            "type": "IdentityProviderTypeSummary",
            "format": ""
        },
        {
            "name": "isSyncUsersEnabled",
            "baseName": "isSyncUsersEnabled",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isMobileCredentialEnabled",
            "baseName": "isMobileCredentialEnabled",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isSsoEnabled",
            "baseName": "isSsoEnabled",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isMobileSsoEnabled",
            "baseName": "isMobileSsoEnabled",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "lastSyncedAt",
            "baseName": "lastSyncedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
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
        return IdentityProvider.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'IdentityProvider');
    }
    constructor(id, orgId, identityProviderType, isSyncUsersEnabled, isMobileCredentialEnabled, isSsoEnabled, isMobileSsoEnabled, lastSyncedAt, status, createdAt, updatedAt) {
        this.id = id;
        this.orgId = orgId;
        this.identityProviderType = identityProviderType;
        this.isSyncUsersEnabled = isSyncUsersEnabled;
        this.isMobileCredentialEnabled = isMobileCredentialEnabled;
        this.isSsoEnabled = isSsoEnabled;
        this.isMobileSsoEnabled = isMobileSsoEnabled;
        this.lastSyncedAt = lastSyncedAt;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
