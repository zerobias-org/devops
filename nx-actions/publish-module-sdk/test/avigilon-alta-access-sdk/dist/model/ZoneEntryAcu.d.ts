/**
* ACU (Access Control Unit) associated with a zone entry
*/
export declare class ZoneEntryAcu {
    /**
    * ACU identifier
    */
    'id': string;
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
    static newInstance(obj: any): ZoneEntryAcu;
    constructor(id: string);
}
