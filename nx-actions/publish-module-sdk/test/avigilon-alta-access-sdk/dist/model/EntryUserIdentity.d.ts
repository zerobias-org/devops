import { Email } from '@zerobias-org/types-core-js';
export declare class EntryUserIdentity {
    /**
    * Identity identifier
    */
    'id'?: string;
    /**
    * User's first name
    */
    'firstName'?: string;
    /**
    * User's middle name
    */
    'middleName'?: string;
    /**
    * User's last name
    */
    'lastName'?: string;
    /**
    * User's full name
    */
    'fullName'?: string;
    /**
    * User's initials
    */
    'initials'?: string;
    /**
    * User's email address
    */
    'email'?: Email;
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
    static newInstance(obj: any): EntryUserIdentity;
    constructor(id?: string, firstName?: string, middleName?: string, lastName?: string, fullName?: string, initials?: string, email?: Email);
}
