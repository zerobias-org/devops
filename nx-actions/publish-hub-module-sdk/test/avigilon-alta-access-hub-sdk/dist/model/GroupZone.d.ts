/**
* Zone associated with a group
*/
export declare class GroupZone {
    /**
    * Zone identifier
    */
    'id': string;
    /**
    * Zone name
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
    static newInstance(obj: any): GroupZone;
    constructor(id: string, name?: string);
}
