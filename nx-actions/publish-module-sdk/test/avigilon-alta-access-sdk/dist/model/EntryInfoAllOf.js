import { ObjectSerializer } from './index.js';
export class EntryInfoAllOf {
    'org';
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
        }
    ];
    static getAttributeTypeMap() {
        return EntryInfoAllOf.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryInfoAllOf');
    }
    constructor(org) {
        this.org = org;
    }
}
