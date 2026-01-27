import { TokenScopeItem } from './TokenScopeItem.js';
export declare class TokenProperties {
    /**
    * Organization ID associated with the token
    */
    'organizationId'?: string;
    /**
    * Identity ID of the token holder
    */
    'identityId'?: string;
    /**
    * Token issued timestamp
    */
    'issuedAt'?: Date;
    /**
    * Token expiration timestamp
    */
    'expiresAt'?: Date;
    /**
    * Permissions granted by this token
    */
    'scope'?: Array<string>;
    /**
    * Type of the access token
    */
    'tokenType'?: string;
    /**
    * JWT token identifier
    */
    'jti'?: string;
    /**
    * Issued at timestamp (Unix epoch)
    */
    'iat'?: number;
    /**
    * Expiration timestamp (Unix epoch)
    */
    'exp'?: number;
    /**
    * List of token scopes with organization context
    */
    'tokenScopeList'?: Array<TokenScopeItem>;
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
    static newInstance(obj: any): TokenProperties;
    constructor(organizationId?: string, identityId?: string, issuedAt?: Date, expiresAt?: Date, scope?: Array<string>, tokenType?: string, jti?: string, iat?: number, exp?: number, tokenScopeList?: Array<TokenScopeItem>);
}
