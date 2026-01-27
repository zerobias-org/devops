import { ObjectSerializer } from './index.js';
/**
* Credential assigned to a user
*/
export class UserCredential {
    /**
    * Credential identifier
    */
    'id';
    /**
    * Credential validity start date
    */
    'startDate';
    /**
    * Credential validity end date
    */
    'endDate';
    'credentialType';
    'mobile';
    'card';
    'pincode';
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
            "name": "startDate",
            "baseName": "startDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "credentialType",
            "baseName": "credentialType",
            // false
            // UserCredentialCredentialType
            // UserCredentialCredentialType
            "type": "UserCredentialCredentialType",
            "format": ""
        },
        {
            "name": "mobile",
            "baseName": "mobile",
            // false
            // UserCredentialMobile
            // UserCredentialMobile
            "type": "UserCredentialMobile",
            "format": ""
        },
        {
            "name": "card",
            "baseName": "card",
            // false
            // UserCredentialCard
            // UserCredentialCard
            "type": "UserCredentialCard",
            "format": ""
        },
        {
            "name": "pincode",
            "baseName": "pincode",
            // false
            // UserCredentialPincode
            // UserCredentialPincode
            "type": "UserCredentialPincode",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserCredential.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserCredential');
    }
    constructor(id, startDate, endDate, credentialType, mobile, card, pincode) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.credentialType = credentialType;
        this.mobile = mobile;
        this.card = card;
        this.pincode = pincode;
    }
}
