import { ObjectSerializer } from './index.js';
export class EntryUserScheduleUser {
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
        return EntryUserScheduleUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryUserScheduleUser');
    }
    constructor(id, status, identity, sites) {
        this.id = id;
        this.status = status;
        this.identity = identity;
        this.sites = sites;
    }
}
