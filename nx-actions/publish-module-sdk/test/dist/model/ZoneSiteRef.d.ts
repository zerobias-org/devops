/**
* Reference to a site within a zone
*/
export declare class ZoneSiteRef {
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
    static newInstance(obj: any): ZoneSiteRef;
    constructor(id: string, name: string);
}
