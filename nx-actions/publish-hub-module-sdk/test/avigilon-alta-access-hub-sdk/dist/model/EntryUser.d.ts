import { UserSite } from './UserSite.js';
import { EntryUserIdentity } from './EntryUserIdentity.js';
/**
* User with access to a specific entry
*/
export declare class EntryUser {
    /**
    * User identifier
    */
    'id': string;
    /**
    * User status
    */
    'status'?: string;
    'identity'?: EntryUserIdentity;
    /**
    * Sites the user has access to
    */
    'sites'?: Array<UserSite>;
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
    static newInstance(obj: any): EntryUser;
    constructor(id: string, status?: string, identity?: EntryUserIdentity, sites?: Array<UserSite>);
}
