export declare class Role {
    /**
    * Unique identifier for the role
    */
    'id': string;
    /**
    * Name of the role
    */
    'name': string;
    /**
    * Description of the role
    */
    'description'?: string;
    /**
    * List of permissions granted by this role
    */
    'permissions'?: Array<string>;
    /**
    * Timestamp when the role was assigned
    */
    'assignedAt'?: Date;
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
    static newInstance(obj: any): Role;
    constructor(id: string, name: string, description?: string, permissions?: Array<string>, assignedAt?: Date);
}
