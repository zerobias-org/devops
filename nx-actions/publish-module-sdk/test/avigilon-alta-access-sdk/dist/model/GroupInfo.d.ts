import { AccessRule } from './AccessRule.js';
export declare class GroupInfo {
    /**
    * Unique identifier for the group
    */
    'id': string;
    /**
    * Name of the group
    */
    'name': string;
    /**
    * Description of the group
    */
    'description'?: string;
    /**
    * Number of users in the group
    */
    'userCount'?: number;
    /**
    * Badge configuration for the group
    */
    'badgeConfig'?: object;
    /**
    * Timestamp when group was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when group was last updated
    */
    'updatedAt'?: Date;
    /**
    * Organization ID the group belongs to
    */
    'organizationId'?: string;
    /**
    * Parent group ID if this is a child group
    */
    'parentGroupId'?: string;
    /**
    * List of permissions assigned to the group
    */
    'permissions'?: Array<string>;
    /**
    * Access rules for the group
    */
    'accessRules'?: Array<AccessRule>;
    /**
    * Custom field values for the group
    */
    'customFields'?: {
        [key: string]: string;
    };
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
    static newInstance(obj: any): GroupInfo;
    constructor(id: string, name: string, description?: string, userCount?: number, badgeConfig?: object, createdAt?: Date, updatedAt?: Date, organizationId?: string, parentGroupId?: string, permissions?: Array<string>, accessRules?: Array<AccessRule>, customFields?: {
        [key: string]: string;
    });
}
