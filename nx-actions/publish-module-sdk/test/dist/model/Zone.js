import { ObjectSerializer } from './index.js';
export class Zone {
    /**
    * Unique identifier for the zone
    */
    'id';
    /**
    * Name of the zone
    */
    'name';
    /**
    * OPAL identifier for the zone
    */
    'opal';
    /**
    * Description of the zone
    */
    'description';
    /**
    * Anti-passback reset iCal text
    */
    'apbResetIcalText';
    /**
    * Anti-passback expiration in seconds
    */
    'apbExpirationSeconds';
    /**
    * Whether to use contact sensor for anti-passback
    */
    'apbUseContactSensor';
    /**
    * Whether to allow shared organization reset for anti-passback
    */
    'apbAllowSharedOrgReset';
    /**
    * Number of entries in the zone
    */
    'entryCount';
    /**
    * Number of offline entries in the zone
    */
    'offlineEntryCount';
    /**
    * Number of users in the zone
    */
    'userCount';
    /**
    * Number of groups in the zone
    */
    'groupCount';
    'org';
    'site';
    /**
    * Zone shares array
    */
    'zoneShares';
    /**
    * Entries in the zone
    */
    'entries';
    /**
    * Anti-passback areas
    */
    'apbAreas';
    /**
    * Timestamp when zone was created
    */
    'createdAt';
    /**
    * Timestamp when zone was last updated
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
            "name": "description",
            "baseName": "description",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "apbResetIcalText",
            "baseName": "apbResetIcalText",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "apbExpirationSeconds",
            "baseName": "apbExpirationSeconds",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "apbUseContactSensor",
            "baseName": "apbUseContactSensor",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "apbAllowSharedOrgReset",
            "baseName": "apbAllowSharedOrgReset",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "entryCount",
            "baseName": "entryCount",
            // false
            // number
            // number
            "type": "number",
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
            "name": "userCount",
            "baseName": "userCount",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "groupCount",
            "baseName": "groupCount",
            // false
            // number
            // number
            "type": "number",
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
        },
        {
            "name": "site",
            "baseName": "site",
            // false
            // ZoneSiteRef
            // ZoneSiteRef
            "type": "ZoneSiteRef",
            "format": ""
        },
        {
            "name": "zoneShares",
            "baseName": "zoneShares",
            // false
            // Array&lt;object&gt;
            // Array&lt;object&gt;
            "type": "Array<object>",
            "format": ""
        },
        {
            "name": "entries",
            "baseName": "entries",
            // false
            // Array&lt;ZoneEntry&gt;
            // Array&lt;ZoneEntry&gt;
            "type": "Array<ZoneEntry>",
            "format": ""
        },
        {
            "name": "apbAreas",
            "baseName": "apbAreas",
            // false
            // Array&lt;object&gt;
            // Array&lt;object&gt;
            "type": "Array<object>",
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
        return Zone.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'Zone');
    }
    constructor(id, name, opal, description, apbResetIcalText, apbExpirationSeconds, apbUseContactSensor, apbAllowSharedOrgReset, entryCount, offlineEntryCount, userCount, groupCount, org, site, zoneShares, entries, apbAreas, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.opal = opal;
        this.description = description;
        this.apbResetIcalText = apbResetIcalText;
        this.apbExpirationSeconds = apbExpirationSeconds;
        this.apbUseContactSensor = apbUseContactSensor;
        this.apbAllowSharedOrgReset = apbAllowSharedOrgReset;
        this.entryCount = entryCount;
        this.offlineEntryCount = offlineEntryCount;
        this.userCount = userCount;
        this.groupCount = groupCount;
        this.org = org;
        this.site = site;
        this.zoneShares = zoneShares;
        this.entries = entries;
        this.apbAreas = apbAreas;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
