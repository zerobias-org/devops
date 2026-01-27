/**
* Summary of identity provider type for nested contexts
*/
export declare class IdentityProviderTypeSummary {
    /**
    * Type identifier
    */
    'id': number;
    /**
    * Type name
    */
    'name'?: string;
    /**
    * Type code
    */
    'code'?: string;
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
    static newInstance(obj: any): IdentityProviderTypeSummary;
    constructor(id: number, name?: string, code?: string);
}
