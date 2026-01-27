export declare class Group {
    /**
    * Unique identifier for the group
    */
    'id': string;
    /**
    * Name of the group
    */
    'name': string;
    /**
    * Description of the group
    */
    'description'?: string;
    /**
    * Number of users in the group
    */
    'userCount'?: number;
    /**
    * Badge configuration for the group
    */
    'badgeConfig'?: object;
    /**
    * Timestamp when group was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when group was last updated
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
    static newInstance(obj: any): Group;
    constructor(id: string, name: string, description?: string, userCount?: number, badgeConfig?: object, createdAt?: Date, updatedAt?: Date);
}
