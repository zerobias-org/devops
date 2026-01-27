import { ObjectSerializer } from './index.js';
export class EntryInfo {
    /**
    * Unique identifier for the entry
    */
    'id';
    /**
    * Name of the entry
    */
    'name';
    /**
    * OPAL identifier for the entry
    */
    'opal';
    /**
    * Entry pincode if enabled
    */
    'pincode';
    /**
    * Whether pincode is enabled for this entry
    */
    'isPincodeEnabled';
    /**
    * Color code for the entry
    */
    'color';
    /**
    * Whether this entry is a muster point
    */
    'isMusterPoint';
    /**
    * Notes about the entry
    */
    'notes';
    /**
    * External UUID identifier
    */
    'externalUuid';
    /**
    * Whether this is a readerless entry
    */
    'isReaderless';
    /**
    * Whether this is an intercom entry
    */
    'isIntercomEntry';
    /**
    * Timestamp when entry was created
    */
    'createdAt';
    /**
    * Timestamp when entry was last updated
    */
    'updatedAt';
    'zone';
    'acu';
    /**
    * Wireless lock information
    */
    'wirelessLock';
    'entryState';
    'schedule';
    /**
    * Cameras associated with the entry
    */
    'cameras';
    'org';
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
            "name": "opal",
            "baseName": "opal",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "pincode",
            "baseName": "pincode",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "isPincodeEnabled",
            "baseName": "isPincodeEnabled",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "color",
            "baseName": "color",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "isMusterPoint",
            "baseName": "isMusterPoint",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "notes",
            "baseName": "notes",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "externalUuid",
            "baseName": "externalUuid",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "isReaderless",
            "baseName": "isReaderless",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isIntercomEntry",
            "baseName": "isIntercomEntry",
            // false
            // boolean
            // boolean
            "type": "boolean",
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
        },
        {
            "name": "zone",
            "baseName": "zone",
            // false
            // EntryZone
            // EntryZone
            "type": "EntryZone",
            "format": ""
        },
        {
            "name": "acu",
            "baseName": "acu",
            // false
            // EntryAcu
            // EntryAcu
            "type": "EntryAcu",
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
            "name": "entryState",
            "baseName": "entryState",
            // false
            // EntryState
            // EntryState
            "type": "EntryState",
            "format": ""
        },
        {
            "name": "schedule",
            "baseName": "schedule",
            // false
            // EntrySchedule
            // EntrySchedule
            "type": "EntrySchedule",
            "format": ""
        },
        {
            "name": "cameras",
            "baseName": "cameras",
            // false
            // Array&lt;EntryCamera&gt;
            // Array&lt;EntryCamera&gt;
            "type": "Array<EntryCamera>",
            "format": ""
        },
        {
            "name": "org",
            "baseName": "org",
            // false
            // OrganizationRef
            // OrganizationRef
            "type": "OrganizationRef",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryInfo');
    }
    constructor(id, name, opal, pincode, isPincodeEnabled, color, isMusterPoint, notes, externalUuid, isReaderless, isIntercomEntry, createdAt, updatedAt, zone, acu, wirelessLock, entryState, schedule, cameras, org) {
        this.id = id;
        this.name = name;
        this.opal = opal;
        this.pincode = pincode;
        this.isPincodeEnabled = isPincodeEnabled;
        this.color = color;
        this.isMusterPoint = isMusterPoint;
        this.notes = notes;
        this.externalUuid = externalUuid;
        this.isReaderless = isReaderless;
        this.isIntercomEntry = isIntercomEntry;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.zone = zone;
        this.acu = acu;
        this.wirelessLock = wirelessLock;
        this.entryState = entryState;
        this.schedule = schedule;
        this.cameras = cameras;
        this.org = org;
    }
}
