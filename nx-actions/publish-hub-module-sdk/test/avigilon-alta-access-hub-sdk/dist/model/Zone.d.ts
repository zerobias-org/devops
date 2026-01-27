import { ZoneSiteRef } from './ZoneSiteRef.js';
import { OrganizationRef } from './OrganizationRef.js';
import { ZoneEntry } from './ZoneEntry.js';
export declare class Zone {
    /**
    * Unique identifier for the zone
    */
    'id': string;
    /**
    * Name of the zone
    */
    'name': string;
    /**
    * OPAL identifier for the zone
    */
    'opal'?: string;
    /**
    * Description of the zone
    */
    'description'?: string;
    /**
    * Anti-passback reset iCal text
    */
    'apbResetIcalText'?: string;
    /**
    * Anti-passback expiration in seconds
    */
    'apbExpirationSeconds'?: number;
    /**
    * Whether to use contact sensor for anti-passback
    */
    'apbUseContactSensor'?: boolean;
    /**
    * Whether to allow shared organization reset for anti-passback
    */
    'apbAllowSharedOrgReset'?: boolean;
    /**
    * Number of entries in the zone
    */
    'entryCount'?: number;
    /**
    * Number of offline entries in the zone
    */
    'offlineEntryCount'?: number;
    /**
    * Number of users in the zone
    */
    'userCount'?: number;
    /**
    * Number of groups in the zone
    */
    'groupCount'?: number;
    'org'?: OrganizationRef;
    'site'?: ZoneSiteRef;
    /**
    * Zone shares array
    */
    'zoneShares'?: Array<object>;
    /**
    * Entries in the zone
    */
    'entries'?: Array<ZoneEntry>;
    /**
    * Anti-passback areas
    */
    'apbAreas'?: Array<object>;
    /**
    * Timestamp when zone was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when zone was last updated
    */
    'updatedAt'?: Date;
    static readonly discriminator: string | undefined;
    static attributeTypeMap: ReadonlyArray<{
        name: string;
        baseName: string;
        type: string;
        format: string;
    }>;
    static getAttributeTypeMap(): readonly {
        name: string;
        baseName: string;
        type: string;
        format: string;
    }[];
    static newInstance(obj: any): Zone;
    constructor(id: string, name: string, opal?: string, description?: string, apbResetIcalText?: string, apbExpirationSeconds?: number, apbUseContactSensor?: boolean, apbAllowSharedOrgReset?: boolean, entryCount?: number, offlineEntryCount?: number, userCount?: number, groupCount?: number, org?: OrganizationRef, site?: ZoneSiteRef, zoneShares?: Array<object>, entries?: Array<ZoneEntry>, apbAreas?: Array<object>, createdAt?: Date, updatedAt?: Date);
}
