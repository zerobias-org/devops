import { ObjectSerializer } from './index.js';
/**
* Namespace information for user identity
*/
export class IdentityNamespace {
    /**
    * Namespace identifier
    */
    'id';
    /**
    * Namespace nickname
    */
    'nickname';
    'namespaceType';
    'org';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "nickname",
            "baseName": "nickname",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "namespaceType",
            "baseName": "namespaceType",
            // false
            // NamespaceType
            // NamespaceType
            "type": "NamespaceType",
            "format": ""
        },
        {
            "name": "org",
            "baseName": "org",
            // false
            // OrganizationRef
            // OrganizationRef
            "type": "OrganizationRef",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return IdentityNamespace.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'IdentityNamespace');
    }
    constructor(id, nickname, namespaceType, org) {
        this.id = id;
        this.nickname = nickname;
        this.namespaceType = namespaceType;
        this.org = org;
    }
}
