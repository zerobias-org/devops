/**
* State information for an entry
*/
export declare class EntryState {
    /**
    * Entry state identifier
    */
    'id': string;
    /**
    * Entry state name
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
    static newInstance(obj: any): EntryState;
    constructor(id: string, name: string);
}
