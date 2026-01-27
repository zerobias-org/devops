/**
* Mobile credential information
*/
export declare class OrgCredentialMobile {
    /**
    * Mobile credential identifier
    */
    'id'?: string;
    /**
    * Mobile device name
    */
    'name'?: string;
    /**
    * Provisioned timestamp
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
    static newInstance(obj: any): OrgCredentialMobile;
    constructor(id?: string, name?: string, provisionedAt?: Date);
}
