/**
* Summary representation of a group for nested contexts
*/
export declare class GroupSummary {
    /**
    * Group identifier
    */
    'id'?: string;
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
    static newInstance(obj: any): GroupSummary;
    constructor(id?: string, name?: string);
}
