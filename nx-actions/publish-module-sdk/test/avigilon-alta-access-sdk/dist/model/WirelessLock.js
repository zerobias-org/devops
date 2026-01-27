import { ObjectSerializer } from './index.js';
/**
* Wireless lock information
*/
export class WirelessLock {
    /**
    * Wireless lock identifier
    */
    'id';
    /**
    * NoTour lock identifier
    */
    'noTourLockId';
    /**
    * Whether the wireless lock is offline
    */
    'isOffline';
    /**
    * Database entries for the wireless lock
    */
    'wirelessLockDbEntries';
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
            "name": "noTourLockId",
            "baseName": "noTourLockId",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "isOffline",
            "baseName": "isOffline",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "wirelessLockDbEntries",
            "baseName": "wirelessLockDbEntries",
            // false
            // Array&lt;WirelessLockDbEntry&gt;
            // Array&lt;WirelessLockDbEntry&gt;
            "type": "Array<WirelessLockDbEntry>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return WirelessLock.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'WirelessLock');
    }
    constructor(id, noTourLockId, isOffline, wirelessLockDbEntries) {
        this.id = id;
        this.noTourLockId = noTourLockId;
        this.isOffline = isOffline;
        this.wirelessLockDbEntries = wirelessLockDbEntries;
    }
}
