import { ObjectSerializer } from './index.js';
/**
* Organization-level credential
*/
export class OrgCredential {
    /**
    * Credential identifier
    */
    'id';
    /**
    * User identifier this credential belongs to
    */
    'userId';
    'user';
    'credentialType';
    /**
    * Credential validity start date
    */
    'startDate';
    /**
    * Credential validity end date
    */
    'endDate';
    'mobile';
    'card';
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
            // OrgCredentialUser
            // OrgCredentialUser
            "type": "OrgCredentialUser",
            "format": ""
        },
        {
            "name": "credentialType",
            "baseName": "credentialType",
            // false
            // CredentialType
            // CredentialType
            "type": "CredentialType",
            "format": ""
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "mobile",
            "baseName": "mobile",
            // false
            // OrgCredentialMobile
            // OrgCredentialMobile
            "type": "OrgCredentialMobile",
            "format": ""
        },
        {
            "name": "card",
            "baseName": "card",
            // false
            // OrgCredentialCard
            // OrgCredentialCard
            "type": "OrgCredentialCard",
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
        return OrgCredential.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'OrgCredential');
    }
    constructor(id, userId, user, credentialType, startDate, endDate, mobile, card, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.credentialType = credentialType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mobile = mobile;
        this.card = card;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
