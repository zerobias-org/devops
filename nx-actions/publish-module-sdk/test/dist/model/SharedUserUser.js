import { ObjectSerializer } from './index.js';
/**
* User details
*/
export class SharedUserUser {
    /**
    * User identifier
    */
    'id';
    /**
    * User status
    */
    'status';
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
        }
    ];
    static getAttributeTypeMap() {
        return SharedUserUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'SharedUserUser');
    }
    constructor(id, status, identity) {
        this.id = id;
        this.status = status;
        this.identity = identity;
    }
}
