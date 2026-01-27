import { UserIdentity } from './UserIdentity.js';
/**
* User details
*/
export declare class OrgCredentialUser {
    /**
    * User identifier
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
    static newInstance(obj: any): OrgCredentialUser;
    constructor(id?: string, identity?: UserIdentity);
}
