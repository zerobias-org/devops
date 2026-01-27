import { ObjectSerializer } from './index.js';
/**
* Multi-factor authentication credential for a user
*/
export class MfaCredential {
    /**
    * MFA credential identifier
    */
    'id';
    /**
    * Timestamp when credential was created
    */
    'createdAt';
    /**
    * Timestamp when credential was last updated
    */
    'updatedAt';
    /**
    * Name of the MFA credential
    */
    'name';
    /**
    * Status of the MFA credential
    */
    'status';
    'mfaCredentialType';
    'totpSoftDevice';
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
            "name": "name",
            "baseName": "name",
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
            "name": "mfaCredentialType",
            "baseName": "mfaCredentialType",
            // false
            // MfaCredentialType
            // MfaCredentialType
            "type": "MfaCredentialType",
            "format": ""
        },
        {
            "name": "totpSoftDevice",
            "baseName": "totpSoftDevice",
            // false
            // TotpSoftDevice
            // TotpSoftDevice
            "type": "TotpSoftDevice",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return MfaCredential.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'MfaCredential');
    }
    constructor(id, createdAt, updatedAt, name, status, mfaCredentialType, totpSoftDevice) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.status = status;
        this.mfaCredentialType = mfaCredentialType;
        this.totpSoftDevice = totpSoftDevice;
    }
}
