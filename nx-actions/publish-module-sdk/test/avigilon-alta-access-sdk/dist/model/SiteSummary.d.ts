/**
* Summary representation of a site for nested contexts
*/
export declare class SiteSummary {
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
    static newInstance(obj: any): SiteSummary;
    constructor(id: string, name: string);
}
