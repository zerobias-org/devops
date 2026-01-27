import { ObjectSerializer } from './index.js';
/**
* Zone information for a user entry
*/
export class UserEntryZone {
    /**
    * Zone identifier
    */
    'id';
    /**
    * Zone name
    */
    'name';
    /**
    * Number of offline entries in the zone
    */
    'offlineEntryCount';
    'site';
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
            "name": "name",
            "baseName": "name",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "offlineEntryCount",
            "baseName": "offlineEntryCount",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "site",
            "baseName": "site",
            // false
            // ZoneSiteRef
            // ZoneSiteRef
            "type": "ZoneSiteRef",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserEntryZone.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserEntryZone');
    }
    constructor(id, name, offlineEntryCount, site) {
        this.id = id;
        this.name = name;
        this.offlineEntryCount = offlineEntryCount;
        this.site = site;
    }
}
