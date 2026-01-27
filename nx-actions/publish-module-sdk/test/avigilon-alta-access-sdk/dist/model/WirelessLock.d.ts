import { WirelessLockDbEntry } from './WirelessLockDbEntry.js';
/**
* Wireless lock information
*/
export declare class WirelessLock {
    /**
    * Wireless lock identifier
    */
    'id': string;
    /**
    * NoTour lock identifier
    */
    'noTourLockId'?: number;
    /**
    * Whether the wireless lock is offline
    */
    'isOffline'?: boolean;
    /**
    * Database entries for the wireless lock
    */
    'wirelessLockDbEntries'?: Array<WirelessLockDbEntry>;
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
    static newInstance(obj: any): WirelessLock;
    constructor(id: string, noTourLockId?: number, isOffline?: boolean, wirelessLockDbEntries?: Array<WirelessLockDbEntry>);
}
