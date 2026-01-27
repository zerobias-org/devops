import { AccessRule } from './AccessRule.js';
export declare class GroupInfoAllOf {
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
    static newInstance(obj: any): GroupInfoAllOf;
    constructor(organizationId?: string, parentGroupId?: string, permissions?: Array<string>, accessRules?: Array<AccessRule>, customFields?: {
        [key: string]: string;
    });
}
