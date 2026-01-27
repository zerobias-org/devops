import { ObjectSerializer } from './index.js';
/**
* Entry/access permission associated with a user
*/
export class UserEntry {
    /**
    * Entry identifier
    */
    'id';
    /**
    * Entry name
    */
    'name';
    'wirelessLock';
    'zone';
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
            "name": "wirelessLock",
            "baseName": "wirelessLock",
            // false
            // WirelessLock
            // WirelessLock
            "type": "WirelessLock",
            "format": ""
        },
        {
            "name": "zone",
            "baseName": "zone",
            // false
            // UserEntryZone
            // UserEntryZone
            "type": "UserEntryZone",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserEntry.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserEntry');
    }
    constructor(id, name, wirelessLock, zone) {
        this.id = id;
        this.name = name;
        this.wirelessLock = wirelessLock;
        this.zone = zone;
    }
}
