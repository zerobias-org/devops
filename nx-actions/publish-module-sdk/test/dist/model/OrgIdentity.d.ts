import { Email, URL } from '@zerobias-org/types-core-js';
/**
* Organization identity
*/
export declare class OrgIdentity {
    /**
    * Identity identifier
    */
    'id': string;
    /**
    * Email address
    */
    'email'?: Email;
    /**
    * First name
    */
    'firstName'?: string;
    /**
    * Last name
    */
    'lastName'?: string;
    /**
    * Phone number
    */
    'phoneNumber'?: string;
    /**
    * Avatar URL
    */
    'avatarUrl'?: URL;
    /**
    * Whether identity is verified
    */
    'isVerified'?: boolean;
    /**
    * Creation timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): OrgIdentity;
    constructor(id: string, email?: Email, firstName?: string, lastName?: string, phoneNumber?: string, avatarUrl?: URL, isVerified?: boolean, createdAt?: Date, updatedAt?: Date);
}
