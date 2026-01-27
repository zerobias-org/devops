import { SiteSummary } from './SiteSummary.js';
/**
* Role with detailed information
*/
export declare class RoleInfo {
    /**
    * Role identifier
    */
    'id': string;
    /**
    * Role name
    */
    'name': string;
    /**
    * Role description
    */
    'description'?: string;
    /**
    * Whether role can be edited
    */
    'isEditable'?: boolean;
    /**
    * Whether role is site-specific
    */
    'isSiteSpecific'?: boolean;
    /**
    * Whether MFA is required for this role
    */
    'isMfaRequired'?: boolean;
    /**
    * Number of users with this role
    */
    'userCount'?: number;
    /**
    * Sites associated with the role
    */
    'sites'?: Array<SiteSummary>;
    /**
    * Creation timestamp
    */
    'createdAt'?: Date;
    /**
    * Last update timestamp
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): RoleInfo;
    constructor(id: string, name: string, description?: string, isEditable?: boolean, isSiteSpecific?: boolean, isMfaRequired?: boolean, userCount?: number, sites?: Array<SiteSummary>, createdAt?: Date, updatedAt?: Date);
}
