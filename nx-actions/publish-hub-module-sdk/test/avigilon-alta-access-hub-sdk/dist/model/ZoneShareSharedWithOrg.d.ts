/**
* Organization details
*/
export declare class ZoneShareSharedWithOrg {
    /**
    * Shared organization identifier
    */
    'id'?: string;
    /**
    * Shared organization name
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
    static newInstance(obj: any): ZoneShareSharedWithOrg;
    constructor(id?: string, name?: string);
}
