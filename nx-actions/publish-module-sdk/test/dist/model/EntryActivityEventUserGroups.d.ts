export declare class EntryActivityEventUserGroups {
    /**
    * Group identifier
    */
    'id': string;
    /**
    * Group name
    */
    'name'?: string;
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
    static newInstance(obj: any): EntryActivityEventUserGroups;
    constructor(id: string, name?: string);
}
