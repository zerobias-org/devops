import { OrganizationRef } from './OrganizationRef.js';
import { NamespaceType } from './NamespaceType.js';
/**
* Namespace information for user identity
*/
export declare class IdentityNamespace {
    /**
    * Namespace identifier
    */
    'id'?: number;
    /**
    * Namespace nickname
    */
    'nickname'?: string;
    'namespaceType'?: NamespaceType;
    'org'?: OrganizationRef;
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
    static newInstance(obj: any): IdentityNamespace;
    constructor(id?: number, nickname?: string, namespaceType?: NamespaceType, org?: OrganizationRef);
}
