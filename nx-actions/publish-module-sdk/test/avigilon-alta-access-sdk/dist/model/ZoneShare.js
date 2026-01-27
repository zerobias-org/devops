import { ObjectSerializer } from './index.js';
/**
* Zone share configuration
*/
export class ZoneShare {
    /**
    * Zone share identifier
    */
    'id';
    /**
    * Zone identifier
    */
    'zoneId';
    /**
    * Organization ID that the zone is shared with
    */
    'sharedWithOrgId';
    'sharedWithOrg';
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
            "name": "zoneId",
            "baseName": "zoneId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "sharedWithOrgId",
            "baseName": "sharedWithOrgId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "sharedWithOrg",
            "baseName": "sharedWithOrg",
            // false
            // ZoneShareSharedWithOrg
            // ZoneShareSharedWithOrg
            "type": "ZoneShareSharedWithOrg",
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
        return ZoneShare.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ZoneShare');
    }
    constructor(id, zoneId, sharedWithOrgId, sharedWithOrg, createdAt, updatedAt) {
        this.id = id;
        this.zoneId = zoneId;
        this.sharedWithOrgId = sharedWithOrgId;
        this.sharedWithOrg = sharedWithOrg;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
