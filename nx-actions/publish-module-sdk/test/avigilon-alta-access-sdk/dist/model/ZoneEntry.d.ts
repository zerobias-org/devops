import { ZoneEntryAcu } from './ZoneEntryAcu.js';
export declare class ZoneEntry {
    /**
    * Entry identifier
    */
    'id': string;
    /**
    * Entry name
    */
    'name': string;
    /**
    * Wireless lock information
    */
    'wirelessLock'?: object;
    'acu'?: ZoneEntryAcu;
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
    static newInstance(obj: any): ZoneEntry;
    constructor(id: string, name: string, wirelessLock?: object, acu?: ZoneEntryAcu);
}
