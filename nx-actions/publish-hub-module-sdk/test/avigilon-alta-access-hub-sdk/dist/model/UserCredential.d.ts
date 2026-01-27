import { UserCredentialCard } from './UserCredentialCard.js';
import { UserCredentialCredentialType } from './UserCredentialCredentialType.js';
import { UserCredentialMobile } from './UserCredentialMobile.js';
import { UserCredentialPincode } from './UserCredentialPincode.js';
/**
* Credential assigned to a user
*/
export declare class UserCredential {
    /**
    * Credential identifier
    */
    'id': string;
    /**
    * Credential validity start date
    */
    'startDate'?: Date;
    /**
    * Credential validity end date
    */
    'endDate'?: Date;
    'credentialType'?: UserCredentialCredentialType;
    'mobile'?: UserCredentialMobile;
    'card'?: UserCredentialCard;
    'pincode'?: UserCredentialPincode;
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
    static newInstance(obj: any): UserCredential;
    constructor(id: string, startDate?: Date, endDate?: Date, credentialType?: UserCredentialCredentialType, mobile?: UserCredentialMobile, card?: UserCredentialCard, pincode?: UserCredentialPincode);
}
