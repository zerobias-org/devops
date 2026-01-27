import { IdentityProviderTypeSummary } from './IdentityProviderTypeSummary.js';
/**
* Identity provider configuration
*/
export declare class IdentityProvider {
    /**
    * Identity provider identifier
    */
    'id': number;
    /**
    * Organization ID
    */
    'orgId'?: number;
    'identityProviderType'?: IdentityProviderTypeSummary;
    /**
    * Whether user sync is enabled
    */
    'isSyncUsersEnabled'?: boolean;
    /**
    * Whether mobile credentials are enabled
    */
    'isMobileCredentialEnabled'?: boolean;
    /**
    * Whether SSO is enabled
    */
    'isSsoEnabled'?: boolean;
    /**
    * Whether mobile SSO is enabled
    */
    'isMobileSsoEnabled'?: boolean;
    /**
    * Last sync timestamp
    */
    'lastSyncedAt'?: Date;
    /**
    * Provider status
    */
    'status'?: string;
    /**
    * Creation timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): IdentityProvider;
    constructor(id: number, orgId?: number, identityProviderType?: IdentityProviderTypeSummary, isSyncUsersEnabled?: boolean, isMobileCredentialEnabled?: boolean, isSsoEnabled?: boolean, isMobileSsoEnabled?: boolean, lastSyncedAt?: Date, status?: string, createdAt?: Date, updatedAt?: Date);
}
