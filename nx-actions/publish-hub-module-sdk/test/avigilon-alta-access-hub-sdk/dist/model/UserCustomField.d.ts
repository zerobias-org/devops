export declare class UserCustomField {
    /**
    * Custom field identifier
    */
    'id': string;
    /**
    * Custom field name
    */
    'name': string;
    /**
    * Custom field value
    */
    'value': string;
    /**
    * Custom field type
    */
    'type'?: string;
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
    static newInstance(obj: any): UserCustomField;
    constructor(id: string, name: string, value: string, type?: string);
}
