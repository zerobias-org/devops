import { ObjectSerializer } from './index.js';
/**
* User with access to a specific entry
*/
export class EntryUser {
    /**
    * User identifier
    */
    'id';
    /**
    * User status
    */
    'status';
    'identity';
    /**
    * Sites the user has access to
    */
    'sites';
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
            // EntryUserIdentity
            // EntryUserIdentity
            "type": "EntryUserIdentity",
            "format": ""
        },
        {
            "name": "sites",
            "baseName": "sites",
            // false
            // Array&lt;UserSite&gt;
            // Array&lt;UserSite&gt;
            "type": "Array<UserSite>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryUser');
    }
    constructor(id, status, identity, sites) {
        this.id = id;
        this.status = status;
        this.identity = identity;
        this.sites = sites;
    }
}
