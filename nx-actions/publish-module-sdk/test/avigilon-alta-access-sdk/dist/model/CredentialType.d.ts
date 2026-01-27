/**
* Type of credential that can be assigned to users
*/
export declare class CredentialType {
    /**
    * Credential type identifier
    */
    'id': string;
    /**
    * Credential type name
    */
    'name'?: string;
    /**
    * Credential type description
    */
    'description'?: string;
    /**
    * Model name of the credential type
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
    static newInstance(obj: any): CredentialType;
    constructor(id: string, name?: string, description?: string, modelName?: string);
}
