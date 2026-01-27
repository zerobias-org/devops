import { ObjectSerializer } from './index.js';
/**
* Token scope item with organization and permissions
*/
export class TokenScopeItem {
    'org';
    /**
    * Permissions in this scope
    */
    'scope';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "org",
            "baseName": "org",
            // false
            // OrganizationRef
            // OrganizationRef
            "type": "OrganizationRef",
            "format": ""
        },
        {
            "name": "scope",
            "baseName": "scope",
            // false
            // Array&lt;string&gt;
            // Array&lt;string&gt;
            "type": "Array<string>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return TokenScopeItem.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'TokenScopeItem');
    }
    constructor(org, scope) {
        this.org = org;
        this.scope = scope;
    }
}
