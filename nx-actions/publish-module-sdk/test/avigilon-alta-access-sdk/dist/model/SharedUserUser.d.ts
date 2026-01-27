import { UserIdentity } from './UserIdentity.js';
/**
* User details
*/
export declare class SharedUserUser {
    /**
    * User identifier
    */
    'id'?: string;
    /**
    * User status
    */
    'status'?: string;
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
    static newInstance(obj: any): SharedUserUser;
    constructor(id?: string, status?: string, identity?: UserIdentity);
}
