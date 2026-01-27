/**
* Site information associated with an entry zone
*/
export declare class EntryZoneSite {
    /**
    * Site identifier
    */
    'id': string;
    /**
    * Site name
    */
    'name': string;
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
    static newInstance(obj: any): EntryZoneSite;
    constructor(id: string, name: string);
}
