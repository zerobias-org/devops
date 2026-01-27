/**
* Schedule information for an entry
*/
export declare class EntrySchedule {
    /**
    * Schedule identifier
    */
    'id': string;
    /**
    * Schedule name
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
    static newInstance(obj: any): EntrySchedule;
    constructor(id: string, name: string);
}
