/**
* Source organization details
*/
export declare class SharedUserSharedFromOrg {
    /**
    * Source organization identifier
    */
    'id'?: string;
    /**
    * Source organization name
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
    static newInstance(obj: any): SharedUserSharedFromOrg;
    constructor(id?: string, name?: string);
}
