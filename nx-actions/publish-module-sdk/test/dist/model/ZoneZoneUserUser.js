import { ObjectSerializer } from './index.js';
export class ZoneZoneUserUser {
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
        return ZoneZoneUserUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ZoneZoneUserUser');
    }
    constructor(id, status, identity) {
        this.id = id;
        this.status = status;
        this.identity = identity;
    }
}
