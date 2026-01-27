import { ObjectSerializer } from './index.js';
/**
* User details
*/
export class OrgCredentialUser {
    /**
    * User identifier
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
        return OrgCredentialUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'OrgCredentialUser');
    }
    constructor(id, identity) {
        this.id = id;
        this.identity = identity;
    }
}
