import { OrganizationRef } from './OrganizationRef.js';
/**
* Token scope item with organization and permissions
*/
export declare class TokenScopeItem {
    'org'?: OrganizationRef;
    /**
    * Permissions in this scope
    */
    'scope'?: Array<string>;
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
    static newInstance(obj: any): TokenScopeItem;
    constructor(org?: OrganizationRef, scope?: Array<string>);
}
