import { Email } from '@zerobias-org/types-core-js';
export declare class ConnectionProfile {
    /**
    * The email address to use for authentication
    */
    'email': Email;
    /**
    * The password to provide for authentication
    */
    'password': string;
    /**
    * Time-based One-Time Password for MFA
    */
    'totpCode'?: string;
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
    static newInstance(obj: any): ConnectionProfile;
    constructor(email: Email, password: string, totpCode?: string);
}
