import { WirelessLock } from './WirelessLock.js';
import { UserEntryZone } from './UserEntryZone.js';
/**
* Entry/access permission associated with a user
*/
export declare class UserEntry {
    /**
    * Entry identifier
    */
    'id': string;
    /**
    * Entry name
    */
    'name'?: string;
    'wirelessLock'?: WirelessLock;
    'zone'?: UserEntryZone;
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
    static newInstance(obj: any): UserEntry;
    constructor(id: string, name?: string, wirelessLock?: WirelessLock, zone?: UserEntryZone);
}
