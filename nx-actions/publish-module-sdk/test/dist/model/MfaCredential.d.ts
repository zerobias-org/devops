import { MfaCredentialType } from './MfaCredentialType.js';
import { TotpSoftDevice } from './TotpSoftDevice.js';
/**
* Multi-factor authentication credential for a user
*/
export declare class MfaCredential {
    /**
    * MFA credential identifier
    */
    'id': string;
    /**
    * Timestamp when credential was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when credential was last updated
    */
    'updatedAt'?: Date;
    /**
    * Name of the MFA credential
    */
    'name'?: string;
    /**
    * Status of the MFA credential
    */
    'status'?: string;
    'mfaCredentialType'?: MfaCredentialType;
    'totpSoftDevice'?: TotpSoftDevice;
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
    static newInstance(obj: any): MfaCredential;
    constructor(id: string, createdAt?: Date, updatedAt?: Date, name?: string, status?: string, mfaCredentialType?: MfaCredentialType, totpSoftDevice?: TotpSoftDevice);
}
