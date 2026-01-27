import { OrgCredentialCard } from './OrgCredentialCard.js';
import { OrgCredentialMobile } from './OrgCredentialMobile.js';
import { OrgCredentialUser } from './OrgCredentialUser.js';
import { CredentialType } from './CredentialType.js';
/**
* Organization-level credential
*/
export declare class OrgCredential {
    /**
    * Credential identifier
    */
    'id': string;
    /**
    * User identifier this credential belongs to
    */
    'userId'?: string;
    'user'?: OrgCredentialUser;
    'credentialType'?: CredentialType;
    /**
    * Credential validity start date
    */
    'startDate'?: Date;
    /**
    * Credential validity end date
    */
    'endDate'?: Date;
    'mobile'?: OrgCredentialMobile;
    'card'?: OrgCredentialCard;
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
    static newInstance(obj: any): OrgCredential;
    constructor(id: string, userId?: string, user?: OrgCredentialUser, credentialType?: CredentialType, startDate?: Date, endDate?: Date, mobile?: OrgCredentialMobile, card?: OrgCredentialCard, createdAt?: Date, updatedAt?: Date);
}
