import { GroupSummary } from './GroupSummary.js';
import { IdentityProviderGroup } from './IdentityProviderGroup.js';
/**
* Mapping between identity provider groups and organization groups
*/
export declare class IdentityProviderGroupRelation {
    /**
    * Identity provider group identifier
    */
    'idpGroupUniqueIdentifier'?: string;
    'identityProviderGroup'?: IdentityProviderGroup;
    /**
    * Organization group ID
    */
    'groupId'?: number;
    'group'?: GroupSummary;
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
    static newInstance(obj: any): IdentityProviderGroupRelation;
    constructor(idpGroupUniqueIdentifier?: string, identityProviderGroup?: IdentityProviderGroup, groupId?: number, group?: GroupSummary);
}
