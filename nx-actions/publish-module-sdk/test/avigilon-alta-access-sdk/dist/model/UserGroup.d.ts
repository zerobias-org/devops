export declare class UserGroup {
    /**
    * Group identifier
    */
    'id': string;
    /**
    * Group name
    */
    'name': string;
    /**
    * Group description
    */
    'description'?: string;
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
    static newInstance(obj: any): UserGroup;
    constructor(id: string, name: string, description?: string);
}
