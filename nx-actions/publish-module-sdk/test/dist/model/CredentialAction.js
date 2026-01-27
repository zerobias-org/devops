import { ObjectSerializer } from './index.js';
/**
* Action performed on a credential
*/
export class CredentialAction {
    /**
    * Credential action identifier
    */
    'id';
    /**
    * Credential identifier
    */
    'credentialId';
    'credentialActionType';
    'performedBy';
    /**
    * Timestamp when action was performed
    */
    'performedAt';
    /**
    * Additional action details
    */
    'details';
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
            "name": "credentialId",
            "baseName": "credentialId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "credentialActionType",
            "baseName": "credentialActionType",
            // false
            // CredentialActionType
            // CredentialActionType
            "type": "CredentialActionType",
            "format": ""
        },
        {
            "name": "performedBy",
            "baseName": "performedBy",
            // false
            // CredentialActionPerformedBy
            // CredentialActionPerformedBy
            "type": "CredentialActionPerformedBy",
            "format": ""
        },
        {
            "name": "performedAt",
            "baseName": "performedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "details",
            "baseName": "details",
            // false
            // object
            // object
            "type": "object",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return CredentialAction.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'CredentialAction');
    }
    constructor(id, credentialId, credentialActionType, performedBy, performedAt, details) {
        this.id = id;
        this.credentialId = credentialId;
        this.credentialActionType = credentialActionType;
        this.performedBy = performedBy;
        this.performedAt = performedAt;
        this.details = details;
    }
}
