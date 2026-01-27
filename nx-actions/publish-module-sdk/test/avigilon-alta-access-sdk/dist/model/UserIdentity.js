import { ObjectSerializer } from './index.js';
/**
* User identity information
*/
export class UserIdentity {
    /**
    * Identity identifier
    */
    'id';
    /**
    * User's email address
    */
    'email';
    /**
    * User's first name
    */
    'firstName';
    /**
    * User's last name
    */
    'lastName';
    /**
    * User's full name
    */
    'fullName';
    /**
    * User's initials
    */
    'initials';
    /**
    * OPAL identifier for this identity
    */
    'opal';
    /**
    * User's phone number
    */
    'phoneNumber';
    /**
    * User's mobile phone number
    */
    'mobilePhone';
    /**
    * URL to user's avatar image
    */
    'avatarUrl';
    /**
    * User's middle name
    */
    'middleName';
    /**
    * User's name suffix
    */
    'suffix';
    /**
    * User's preferred name
    */
    'preferredName';
    /**
    * User's pronouns
    */
    'pronouns';
    /**
    * User's date of birth
    */
    'dateOfBirth';
    /**
    * Emergency contact name
    */
    'emergencyContactName';
    /**
    * Emergency contact phone
    */
    'emergencyContactPhone';
    /**
    * User's home address
    */
    'homeAddress';
    /**
    * User's company name
    */
    'companyName';
    /**
    * User's work address
    */
    'workAddress';
    /**
    * Whether the email has been verified
    */
    'isEmailVerified';
    /**
    * Identity provider unique identifier
    */
    'idpUniqueIdentifier';
    /**
    * User's language preference
    */
    'language';
    /**
    * User's nicknames
    */
    'nicknames';
    /**
    * Whether the user needs to change their password
    */
    'needsPasswordChange';
    /**
    * Creation timestamp
    */
    'createdAt';
    /**
    * Last update timestamp
    */
    'updatedAt';
    'namespace';
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
            "name": "email",
            "baseName": "email",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
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
            "name": "opal",
            "baseName": "opal",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "phoneNumber",
            "baseName": "phoneNumber",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "mobilePhone",
            "baseName": "mobilePhone",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "avatarUrl",
            "baseName": "avatarUrl",
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
            "name": "suffix",
            "baseName": "suffix",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "preferredName",
            "baseName": "preferredName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "pronouns",
            "baseName": "pronouns",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "dateOfBirth",
            "baseName": "dateOfBirth",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "emergencyContactName",
            "baseName": "emergencyContactName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "emergencyContactPhone",
            "baseName": "emergencyContactPhone",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "homeAddress",
            "baseName": "homeAddress",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "companyName",
            "baseName": "companyName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "workAddress",
            "baseName": "workAddress",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "isEmailVerified",
            "baseName": "isEmailVerified",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "idpUniqueIdentifier",
            "baseName": "idpUniqueIdentifier",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "language",
            "baseName": "language",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "nicknames",
            "baseName": "nicknames",
            // false
            // Array&lt;string&gt;
            // Array&lt;string&gt;
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "needsPasswordChange",
            "baseName": "needsPasswordChange",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "updatedAt",
            "baseName": "updatedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "namespace",
            "baseName": "namespace",
            // false
            // IdentityNamespace
            // IdentityNamespace
            "type": "IdentityNamespace",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserIdentity.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserIdentity');
    }
    constructor(id, email, firstName, lastName, fullName, initials, opal, phoneNumber, mobilePhone, avatarUrl, middleName, suffix, preferredName, pronouns, dateOfBirth, emergencyContactName, emergencyContactPhone, homeAddress, companyName, workAddress, isEmailVerified, idpUniqueIdentifier, language, nicknames, needsPasswordChange, createdAt, updatedAt, namespace) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.initials = initials;
        this.opal = opal;
        this.phoneNumber = phoneNumber;
        this.mobilePhone = mobilePhone;
        this.avatarUrl = avatarUrl;
        this.middleName = middleName;
        this.suffix = suffix;
        this.preferredName = preferredName;
        this.pronouns = pronouns;
        this.dateOfBirth = dateOfBirth;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.homeAddress = homeAddress;
        this.companyName = companyName;
        this.workAddress = workAddress;
        this.isEmailVerified = isEmailVerified;
        this.idpUniqueIdentifier = idpUniqueIdentifier;
        this.language = language;
        this.nicknames = nicknames;
        this.needsPasswordChange = needsPasswordChange;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.namespace = namespace;
    }
}
