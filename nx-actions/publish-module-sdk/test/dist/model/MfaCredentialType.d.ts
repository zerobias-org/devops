/**
* Type of MFA credential
*/
export declare class MfaCredentialType {
    /**
    * MFA credential type identifier
    */
    'id': string;
    /**
    * Name of the credential type
    */
    'name'?: string;
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
    static newInstance(obj: any): MfaCredentialType;
    constructor(id: string, name?: string, modelName?: string);
}
