import { ObjectSerializer } from './index.js';
export class ConnectionState {
    /**
    * Number of seconds after which the access token becomes invalid
    */
    'expiresIn';
    /**
    * The access token returned by the Auth client
    */
    'accessToken';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "expiresIn",
            "baseName": "expiresIn",
            // false
            // number
            // number
            "type": "number",
            "format": "int64"
        },
        {
            "name": "accessToken",
            "baseName": "accessToken",
            // false
            // string
            // string
            "type": "string",
            "format": "password"
        }
    ];
    static getAttributeTypeMap() {
        return ConnectionState.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ConnectionState');
    }
    constructor(expiresIn, accessToken) {
        this.expiresIn = expiresIn;
        this.accessToken = accessToken;
    }
}
