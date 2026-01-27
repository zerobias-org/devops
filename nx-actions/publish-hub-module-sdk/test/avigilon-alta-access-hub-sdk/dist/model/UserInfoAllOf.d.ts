import { UserCustomField } from './UserCustomField.js';
import { URL } from '@zerobias-org/types-core-js';
export declare class UserInfoAllOf {
    /**
    * Organization ID the user belongs to
    */
    'organizationId'?: string;
    /**
    * URL to user\'s avatar image
    */
    'avatarUrl'?: URL;
    /**
    * Timestamp of user\'s last login
    */
    'lastLoginAt'?: Date;
    /**
    * List of user permissions
    */
    'permissions'?: Array<string>;
    /**
    * Custom field values for the user
    */
    'customFields'?: Array<UserCustomField>;
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
    static newInstance(obj: any): UserInfoAllOf;
    constructor(organizationId?: string, avatarUrl?: URL, lastLoginAt?: Date, permissions?: Array<string>, customFields?: Array<UserCustomField>);
}
