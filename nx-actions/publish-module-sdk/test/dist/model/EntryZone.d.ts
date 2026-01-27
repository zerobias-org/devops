import { EntryZoneSite } from './EntryZoneSite.js';
/**
* Zone information associated with an entry
*/
export declare class EntryZone {
    /**
    * Zone identifier
    */
    'id': string;
    /**
    * Zone name
    */
    'name': string;
    'site'?: EntryZoneSite;
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
    static newInstance(obj: any): EntryZone;
    constructor(id: string, name: string, site?: EntryZoneSite);
}
