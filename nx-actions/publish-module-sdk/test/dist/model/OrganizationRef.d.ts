/**
* Reference to an organization
*/
export declare class OrganizationRef {
    /**
    * Organization identifier
    */
    'id': string;
    /**
    * Organization name
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
    static newInstance(obj: any): OrganizationRef;
    constructor(id: string, name: string);
}
