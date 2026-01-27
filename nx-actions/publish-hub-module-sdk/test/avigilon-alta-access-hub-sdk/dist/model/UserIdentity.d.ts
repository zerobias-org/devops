import { IdentityNamespace } from './IdentityNamespace.js';
import { Email } from '@zerobias-org/types-core-js';
/**
* User identity information
*/
export declare class UserIdentity {
    /**
    * Identity identifier
    */
    'id': string;
    /**
    * User\'s email address
    */
    'email': Email;
    /**
    * User\'s first name
    */
    'firstName'?: string;
    /**
    * User\'s last name
    */
    'lastName'?: string;
    /**
    * User\'s full name
    */
    'fullName'?: string;
    /**
    * User\'s initials
    */
    'initials'?: string;
    /**
    * OPAL identifier for this identity
    */
    'opal'?: string;
    /**
    * User\'s phone number
    */
    'phoneNumber'?: string;
    /**
    * User\'s mobile phone number
    */
    'mobilePhone'?: string;
    /**
    * URL to user\'s avatar image
    */
    'avatarUrl'?: string;
    /**
    * User\'s middle name
    */
    'middleName'?: string;
    /**
    * User\'s name suffix
    */
    'suffix'?: string;
    /**
    * User\'s preferred name
    */
    'preferredName'?: string;
    /**
    * User\'s pronouns
    */
    'pronouns'?: string;
    /**
    * User\'s date of birth
    */
    'dateOfBirth'?: Date;
    /**
    * Emergency contact name
    */
    'emergencyContactName'?: string;
    /**
    * Emergency contact phone
    */
    'emergencyContactPhone'?: string;
    /**
    * User\'s home address
    */
    'homeAddress'?: string;
    /**
    * User\'s company name
    */
    'companyName'?: string;
    /**
    * User\'s work address
    */
    'workAddress'?: string;
    /**
    * Whether the email has been verified
    */
    'isEmailVerified'?: boolean;
    /**
    * Identity provider unique identifier
    */
    'idpUniqueIdentifier'?: string;
    /**
    * User\'s language preference
    */
    'language'?: string;
    /**
    * User\'s nicknames
    */
    'nicknames'?: Array<string>;
    /**
    * Whether the user needs to change their password
    */
    'needsPasswordChange'?: boolean;
    /**
    * Creation timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
    */
    'updatedAt'?: Date;
    'namespace'?: IdentityNamespace;
    static readonly discriminator: string | undefined;
    static attributeTypeMap: ReadonlyArray<{
        name: string;
        baseName: string;
        type: string;
        format: string;
    }>;
    static getAttributeTypeMap(): readonly {
        name: string;
        baseName: string;
        type: string;
        format: string;
    }[];
    static newInstance(obj: any): UserIdentity;
    constructor(id: string, email: Email, firstName?: string, lastName?: string, fullName?: string, initials?: string, opal?: string, phoneNumber?: string, mobilePhone?: string, avatarUrl?: string, middleName?: string, suffix?: string, preferredName?: string, pronouns?: string, dateOfBirth?: Date, emergencyContactName?: string, emergencyContactPhone?: string, homeAddress?: string, companyName?: string, workAddress?: string, isEmailVerified?: boolean, idpUniqueIdentifier?: string, language?: string, nicknames?: Array<string>, needsPasswordChange?: boolean, createdAt?: Date, updatedAt?: Date, namespace?: IdentityNamespace);
}
