import { ZoneSiteRef } from './ZoneSiteRef.js';
/**
* Zone information for a user entry
*/
export declare class UserEntryZone {
    /**
    * Zone identifier
    */
    'id': string;
    /**
    * Zone name
    */
    'name'?: string;
    /**
    * Number of offline entries in the zone
    */
    'offlineEntryCount'?: number;
    'site'?: ZoneSiteRef;
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
    static newInstance(obj: any): UserEntryZone;
    constructor(id: string, name?: string, offlineEntryCount?: number, site?: ZoneSiteRef);
}
