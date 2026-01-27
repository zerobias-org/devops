import { ObjectSerializer } from './index.js';
export class IdentityProviderTypeInfo {
    /**
    * Identity provider type identifier
    */
    'id';
    /**
    * Identity provider type name
    */
    'name';
    /**
    * Identity provider type code
    */
    'code';
    /**
    * Feature code for the identity provider type
    */
    'featureCode';
    /**
    * Whether IDP-initiated SSO is supported
    */
    'supportsIdpInitiatedSso';
    /**
    * Authentication strategy types supported
    */
    'authStrategyTypes';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "code",
            "baseName": "code",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "featureCode",
            "baseName": "featureCode",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "supportsIdpInitiatedSso",
            "baseName": "supportsIdpInitiatedSso",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "authStrategyTypes",
            "baseName": "authStrategyTypes",
            // false
            // Array&lt;AuthStrategyType&gt;
            // Array&lt;AuthStrategyType&gt;
            "type": "Array<AuthStrategyType>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return IdentityProviderTypeInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'IdentityProviderTypeInfo');
    }
    constructor(id, name, code, featureCode, supportsIdpInitiatedSso, authStrategyTypes) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.featureCode = featureCode;
        this.supportsIdpInitiatedSso = supportsIdpInitiatedSso;
        this.authStrategyTypes = authStrategyTypes;
    }
}
