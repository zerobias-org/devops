import { ObjectSerializer } from './index.js';
/**
* Identity provider group
*/
export class IdentityProviderGroup {
    /**
    * Unique identifier from the identity provider
    */
    'idpGroupUniqueIdentifier';
    /**
    * Group name
    */
    'name';
    /**
    * Group description
    */
    'description';
    /**
    * Group email
    */
    'email';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "idpGroupUniqueIdentifier",
            "baseName": "idpGroupUniqueIdentifier",
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
            "name": "description",
            "baseName": "description",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "email",
            "baseName": "email",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
        }
    ];
    static getAttributeTypeMap() {
        return IdentityProviderGroup.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'IdentityProviderGroup');
    }
    constructor(idpGroupUniqueIdentifier, name, description, email) {
        this.idpGroupUniqueIdentifier = idpGroupUniqueIdentifier;
        this.name = name;
        this.description = description;
        this.email = email;
    }
}
