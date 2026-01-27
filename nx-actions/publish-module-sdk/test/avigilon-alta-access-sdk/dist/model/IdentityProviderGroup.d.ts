import { Email } from '@zerobias-org/types-core-js';
/**
* Identity provider group
*/
export declare class IdentityProviderGroup {
    /**
    * Unique identifier from the identity provider
    */
    'idpGroupUniqueIdentifier'?: string;
    /**
    * Group name
    */
    'name'?: string;
    /**
    * Group description
    */
    'description'?: string;
    /**
    * Group email
    */
    'email'?: Email;
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
    static newInstance(obj: any): IdentityProviderGroup;
    constructor(idpGroupUniqueIdentifier?: string, name?: string, description?: string, email?: Email);
}
