import { UserIdentity } from './UserIdentity.js';
/**
* User who performed the action
*/
export declare class CredentialActionPerformedBy {
    /**
    * User identifier who performed the action
    */
    'id'?: string;
    'identity'?: UserIdentity;
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
    static newInstance(obj: any): CredentialActionPerformedBy;
    constructor(id?: string, identity?: UserIdentity);
}
