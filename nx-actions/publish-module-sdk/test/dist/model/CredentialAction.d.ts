import { CredentialActionType } from './CredentialActionType.js';
import { CredentialActionPerformedBy } from './CredentialActionPerformedBy.js';
/**
* Action performed on a credential
*/
export declare class CredentialAction {
    /**
    * Credential action identifier
    */
    'id': string;
    /**
    * Credential identifier
    */
    'credentialId'?: string;
    'credentialActionType'?: CredentialActionType;
    'performedBy'?: CredentialActionPerformedBy;
    /**
    * Timestamp when action was performed
    */
    'performedAt'?: Date;
    /**
    * Additional action details
    */
    'details'?: object;
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
    static newInstance(obj: any): CredentialAction;
    constructor(id: string, credentialId?: string, credentialActionType?: CredentialActionType, performedBy?: CredentialActionPerformedBy, performedAt?: Date, details?: object);
}
