/**
* Mobile credential information
*/
export declare class UserCredentialMobile {
    /**
    * Mobile credential identifier
    */
    'id'?: string;
    /**
    * Mobile device name
    */
    'name'?: string;
    /**
    * Timestamp when mobile credential was provisioned
    */
    'provisionedAt'?: Date;
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
    static newInstance(obj: any): UserCredentialMobile;
    constructor(id?: string, name?: string, provisionedAt?: Date);
}
