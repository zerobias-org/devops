import { ZoneShareSharedWithOrg } from './ZoneShareSharedWithOrg.js';
/**
* Zone share configuration
*/
export declare class ZoneShare {
    /**
    * Zone share identifier
    */
    'id': string;
    /**
    * Zone identifier
    */
    'zoneId'?: string;
    /**
    * Organization ID that the zone is shared with
    */
    'sharedWithOrgId'?: string;
    'sharedWithOrg'?: ZoneShareSharedWithOrg;
    /**
    * Creation timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
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
    static newInstance(obj: any): ZoneShare;
    constructor(id: string, zoneId?: string, sharedWithOrgId?: string, sharedWithOrg?: ZoneShareSharedWithOrg, createdAt?: Date, updatedAt?: Date);
}
