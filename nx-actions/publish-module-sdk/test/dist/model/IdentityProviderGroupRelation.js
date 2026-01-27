import { ObjectSerializer } from './index.js';
/**
* Mapping between identity provider groups and organization groups
*/
export class IdentityProviderGroupRelation {
    /**
    * Identity provider group identifier
    */
    'idpGroupUniqueIdentifier';
    'identityProviderGroup';
    /**
    * Organization group ID
    */
    'groupId';
    'group';
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
            "name": "identityProviderGroup",
            "baseName": "identityProviderGroup",
            // false
            // IdentityProviderGroup
            // IdentityProviderGroup
            "type": "IdentityProviderGroup",
            "format": ""
        },
        {
            "name": "groupId",
            "baseName": "groupId",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "group",
            "baseName": "group",
            // false
            // GroupSummary
            // GroupSummary
            "type": "GroupSummary",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return IdentityProviderGroupRelation.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'IdentityProviderGroupRelation');
    }
    constructor(idpGroupUniqueIdentifier, identityProviderGroup, groupId, group) {
        this.idpGroupUniqueIdentifier = idpGroupUniqueIdentifier;
        this.identityProviderGroup = identityProviderGroup;
        this.groupId = groupId;
        this.group = group;
    }
}
