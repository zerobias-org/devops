import { ObjectSerializer } from './index.js';
export class ZoneEntry {
    /**
    * Entry identifier
    */
    'id';
    /**
    * Entry name
    */
    'name';
    /**
    * Wireless lock information
    */
    'wirelessLock';
    'acu';
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
            // object
            // object
            "type": "object",
            "format": ""
        },
        {
            "name": "acu",
            "baseName": "acu",
            // false
            // ZoneEntryAcu
            // ZoneEntryAcu
            "type": "ZoneEntryAcu",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return ZoneEntry.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ZoneEntry');
    }
    constructor(id, name, wirelessLock, acu) {
        this.id = id;
        this.name = name;
        this.wirelessLock = wirelessLock;
        this.acu = acu;
    }
}
