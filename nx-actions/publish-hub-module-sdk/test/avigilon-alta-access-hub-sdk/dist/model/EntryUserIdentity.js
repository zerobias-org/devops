import { ObjectSerializer } from './index.js';
export class EntryUserIdentity {
    /**
    * Identity identifier
    */
    'id';
    /**
    * User\'s first name
    */
    'firstName';
    /**
    * User\'s middle name
    */
    'middleName';
    /**
    * User\'s last name
    */
    'lastName';
    /**
    * User\'s full name
    */
    'fullName';
    /**
    * User\'s initials
    */
    'initials';
    /**
    * User\'s email address
    */
    'email';
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
            "name": "firstName",
            "baseName": "firstName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "middleName",
            "baseName": "middleName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "lastName",
            "baseName": "lastName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "fullName",
            "baseName": "fullName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "initials",
            "baseName": "initials",
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
        return EntryUserIdentity.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryUserIdentity');
    }
    constructor(id, firstName, middleName, lastName, fullName, initials, email) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.initials = initials;
        this.email = email;
    }
}
