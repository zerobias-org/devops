import { OrganizationRef } from './OrganizationRef.js';
import { EntryState } from './EntryState.js';
import { EntryCamera } from './EntryCamera.js';
import { EntryZone } from './EntryZone.js';
import { EntrySchedule } from './EntrySchedule.js';
import { EntryAcu } from './EntryAcu.js';
export declare class EntryInfo {
    /**
    * Unique identifier for the entry
    */
    'id': string;
    /**
    * Name of the entry
    */
    'name': string;
    /**
    * OPAL identifier for the entry
    */
    'opal'?: string;
    /**
    * Entry pincode if enabled
    */
    'pincode'?: string;
    /**
    * Whether pincode is enabled for this entry
    */
    'isPincodeEnabled'?: boolean;
    /**
    * Color code for the entry
    */
    'color'?: string;
    /**
    * Whether this entry is a muster point
    */
    'isMusterPoint'?: boolean;
    /**
    * Notes about the entry
    */
    'notes'?: string;
    /**
    * External UUID identifier
    */
    'externalUuid'?: string;
    /**
    * Whether this is a readerless entry
    */
    'isReaderless'?: boolean;
    /**
    * Whether this is an intercom entry
    */
    'isIntercomEntry'?: boolean;
    /**
    * Timestamp when entry was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when entry was last updated
    */
    'updatedAt'?: Date;
    'zone'?: EntryZone;
    'acu'?: EntryAcu;
    /**
    * Wireless lock information
    */
    'wirelessLock'?: object;
    'entryState'?: EntryState;
    'schedule'?: EntrySchedule;
    /**
    * Cameras associated with the entry
    */
    'cameras'?: Array<EntryCamera>;
    'org'?: OrganizationRef;
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
    static newInstance(obj: any): EntryInfo;
    constructor(id: string, name: string, opal?: string, pincode?: string, isPincodeEnabled?: boolean, color?: string, isMusterPoint?: boolean, notes?: string, externalUuid?: string, isReaderless?: boolean, isIntercomEntry?: boolean, createdAt?: Date, updatedAt?: Date, zone?: EntryZone, acu?: EntryAcu, wirelessLock?: object, entryState?: EntryState, schedule?: EntrySchedule, cameras?: Array<EntryCamera>, org?: OrganizationRef);
}
