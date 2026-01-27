/**
* Type of credential action
*/
export declare class CredentialActionType {
    /**
    * Credential action type identifier
    */
    'id': string;
    /**
    * Credential action type name
    */
    'name'?: string;
    /**
    * Credential action type code
    */
    'code'?: string;
    /**
    * Credential action type description
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
    static newInstance(obj: any): CredentialActionType;
    constructor(id: string, name?: string, code?: string, description?: string);
}
