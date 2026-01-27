export declare class Site {
    /**
    * Unique identifier for the site
    */
    'id': string;
    /**
    * Name of the site
    */
    'name': string;
    /**
    * OPAL identifier for the site
    */
    'opal'?: string;
    /**
    * Physical address of the site
    */
    'address'?: string;
    /**
    * Secondary address line
    */
    'address2'?: string;
    /**
    * City where the site is located
    */
    'city'?: string;
    /**
    * State/province where the site is located
    */
    'state'?: string;
    /**
    * Postal/zip code of the site
    */
    'zip'?: string;
    /**
    * Country where the site is located
    */
    'country'?: string;
    /**
    * Phone number for the site
    */
    'phone'?: string;
    /**
    * Language setting for the site
    */
    'language'?: string;
    /**
    * Number of zones at the site
    */
    'zoneCount'?: number;
    /**
    * Number of users at the site
    */
    'userCount'?: number;
    /**
    * Timestamp when site was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when site was last updated
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): Site;
    constructor(id: string, name: string, opal?: string, address?: string, address2?: string, city?: string, state?: string, zip?: string, country?: string, phone?: string, language?: string, zoneCount?: number, userCount?: number, createdAt?: Date, updatedAt?: Date);
}
