export declare class UserCredentialCredentialType {
    /**
    * Credential type identifier
    */
    'id': string;
    /**
    * Credential type name
    */
    'name'?: string;
    /**
    * Credential type model name
    */
    'modelName'?: string;
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
    static newInstance(obj: any): UserCredentialCredentialType;
    constructor(id: string, name?: string, modelName?: string);
}
