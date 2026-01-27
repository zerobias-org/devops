import { ObjectSerializer } from './index.js';
export class TokenProperties {
    /**
    * Organization ID associated with the token
    */
    'organizationId';
    /**
    * Identity ID of the token holder
    */
    'identityId';
    /**
    * Token issued timestamp
    */
    'issuedAt';
    /**
    * Token expiration timestamp
    */
    'expiresAt';
    /**
    * Permissions granted by this token
    */
    'scope';
    /**
    * Type of the access token
    */
    'tokenType';
    /**
    * JWT token identifier
    */
    'jti';
    /**
    * Issued at timestamp (Unix epoch)
    */
    'iat';
    /**
    * Expiration timestamp (Unix epoch)
    */
    'exp';
    /**
    * List of token scopes with organization context
    */
    'tokenScopeList';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "organizationId",
            "baseName": "organizationId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "identityId",
            "baseName": "identityId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "issuedAt",
            "baseName": "issuedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "expiresAt",
            "baseName": "expiresAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "scope",
            "baseName": "scope",
            // false
            // Array&lt;string&gt;
            // Array&lt;string&gt;
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "tokenType",
            "baseName": "tokenType",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "jti",
            "baseName": "jti",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "iat",
            "baseName": "iat",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "exp",
            "baseName": "exp",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "tokenScopeList",
            "baseName": "tokenScopeList",
            // false
            // Array&lt;TokenScopeItem&gt;
            // Array&lt;TokenScopeItem&gt;
            "type": "Array<TokenScopeItem>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return TokenProperties.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'TokenProperties');
    }
    constructor(organizationId, identityId, issuedAt, expiresAt, scope, tokenType, jti, iat, exp, tokenScopeList) {
        this.organizationId = organizationId;
        this.identityId = identityId;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
        this.scope = scope;
        this.tokenType = tokenType;
        this.jti = jti;
        this.iat = iat;
        this.exp = exp;
        this.tokenScopeList = tokenScopeList;
    }
}
