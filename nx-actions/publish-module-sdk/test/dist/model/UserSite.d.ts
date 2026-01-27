export declare class UserSite {
    /**
    * Site identifier
    */
    'id': string;
    /**
    * Site name
    */
    'name': string;
    /**
    * Site address
    */
    'address'?: string;
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
    static newInstance(obj: any): UserSite;
    constructor(id: string, name: string, address?: string);
}
