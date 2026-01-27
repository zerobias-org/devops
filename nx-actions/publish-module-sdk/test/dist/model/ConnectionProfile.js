import { ObjectSerializer } from './index.js';
export class ConnectionProfile {
    /**
    * The email address to use for authentication
    */
    'email';
    /**
    * The password to provide for authentication
    */
    'password';
    /**
    * Time-based One-Time Password for MFA
    */
    'totpCode';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "email",
            "baseName": "email",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
        },
        {
            "name": "password",
            "baseName": "password",
            // false
            // string
            // string
            "type": "string",
            "format": "password"
        },
        {
            "name": "totpCode",
            "baseName": "totpCode",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return ConnectionProfile.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ConnectionProfile');
    }
    constructor(email, password, totpCode) {
        this.email = email;
        this.password = password;
        this.totpCode = totpCode;
    }
}
