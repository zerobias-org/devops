import { AuthStrategyType } from './AuthStrategyType.js';
export declare class IdentityProviderTypeInfo {
    /**
    * Identity provider type identifier
    */
    'id': string;
    /**
    * Identity provider type name
    */
    'name': string;
    /**
    * Identity provider type code
    */
    'code': string;
    /**
    * Feature code for the identity provider type
    */
    'featureCode'?: string;
    /**
    * Whether IDP-initiated SSO is supported
    */
    'supportsIdpInitiatedSso'?: boolean;
    /**
    * Authentication strategy types supported
    */
    'authStrategyTypes'?: Array<AuthStrategyType>;
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
    static newInstance(obj: any): IdentityProviderTypeInfo;
    constructor(id: string, name: string, code: string, featureCode?: string, supportsIdpInitiatedSso?: boolean, authStrategyTypes?: Array<AuthStrategyType>);
}
