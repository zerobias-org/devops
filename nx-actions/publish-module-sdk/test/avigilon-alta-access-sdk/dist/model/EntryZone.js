import { ObjectSerializer } from './index.js';
/**
* Zone information associated with an entry
*/
export class EntryZone {
    /**
    * Zone identifier
    */
    'id';
    /**
    * Zone name
    */
    'name';
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
            "name": "site",
            "baseName": "site",
            // false
            // EntryZoneSite
            // EntryZoneSite
            "type": "EntryZoneSite",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryZone.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryZone');
    }
    constructor(id, name, site) {
        this.id = id;
        this.name = name;
        this.site = site;
    }
}
