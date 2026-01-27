import { UserIdentity } from './UserIdentity.js';
/**
* User assigned to a role
*/
export declare class RoleUser {
    /**
    * User identifier
    */
    'id': string;
    /**
    * User status
    */
    'status'?: string;
    'identity'?: UserIdentity;
    /**
    * Timestamp when role was assigned to user
    */
    'assignedAt'?: Date;
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
    static newInstance(obj: any): RoleUser;
    constructor(id: string, status?: string, identity?: UserIdentity, assignedAt?: Date);
}
