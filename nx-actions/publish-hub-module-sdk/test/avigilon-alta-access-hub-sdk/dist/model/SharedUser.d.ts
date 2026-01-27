import { SharedUserUser } from './SharedUserUser.js';
import { SharedUserSharedFromOrg } from './SharedUserSharedFromOrg.js';
/**
* User shared from another organization
*/
export declare class SharedUser {
    /**
    * Shared user identifier
    */
    'id': string;
    /**
    * User identifier
    */
    'userId'?: string;
    'user'?: SharedUserUser;
    /**
    * Organization ID the user is shared from
    */
    'sharedFromOrgId'?: string;
    'sharedFromOrg'?: SharedUserSharedFromOrg;
    /**
    * Timestamp when user was shared
    */
    'sharedAt'?: Date;
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
    static newInstance(obj: any): SharedUser;
    constructor(id: string, userId?: string, user?: SharedUserUser, sharedFromOrgId?: string, sharedFromOrg?: SharedUserSharedFromOrg, sharedAt?: Date);
}
