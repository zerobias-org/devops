/**
* Entry state configuration
*/
export declare class EntryStateInfo {
    /**
    * Entry state identifier
    */
    'id': string;
    /**
    * Entry state name
    */
    'name': string;
    /**
    * Entry state code
    */
    'code': string;
    /**
    * Sort order for the entry state
    */
    'ordinal'?: number;
    /**
    * Entry state description
    */
    'description'?: string;
    /**
    * Whether the entry is locked in this state
    */
    'isLocked'?: boolean;
    /**
    * Whether this is a toggle state
    */
    'isToggle'?: boolean;
    /**
    * Organization identifier if org-specific
    */
    'orgId'?: string;
    /**
    * Whether multi-factor authentication is required
    */
    'isMultiFactor'?: boolean;
    /**
    * Available trigger methods for this state
    */
    'triggerMethods'?: Array<object>;
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
    static newInstance(obj: any): EntryStateInfo;
    constructor(id: string, name: string, code: string, ordinal?: number, description?: string, isLocked?: boolean, isToggle?: boolean, orgId?: string, isMultiFactor?: boolean, triggerMethods?: Array<object>);
}
