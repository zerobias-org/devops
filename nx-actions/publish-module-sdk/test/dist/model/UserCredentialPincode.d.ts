/**
* PIN code credential information
*/
export declare class UserCredentialPincode {
    /**
    * PIN code identifier
    */
    'id'?: string;
    /**
    * PIN code number
    */
    'number'?: string;
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
    static newInstance(obj: any): UserCredentialPincode;
    constructor(id?: string, number?: string);
}
