import { ObjectSerializer } from './index.js';
/**
* User who performed the action
*/
export class CredentialActionPerformedBy {
    /**
    * User identifier who performed the action
    */
    'id';
    'identity';
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
            "name": "identity",
            "baseName": "identity",
            // false
            // UserIdentity
            // UserIdentity
            "type": "UserIdentity",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return CredentialActionPerformedBy.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'CredentialActionPerformedBy');
    }
    constructor(id, identity) {
        this.id = id;
        this.identity = identity;
    }
}
