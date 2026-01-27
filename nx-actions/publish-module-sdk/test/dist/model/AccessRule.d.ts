export declare class AccessRule {
    /**
    * Unique identifier for the access rule
    */
    'id': string;
    /**
    * Name of the access rule
    */
    'name': string;
    /**
    * Description of the access rule
    */
    'description'?: string;
    /**
    * Conditions that must be met for access
    */
    'conditions'?: Array<string>;
    /**
    * Actions to take when rule is triggered
    */
    'actions'?: Array<string>;
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
    static newInstance(obj: any): AccessRule;
    constructor(id: string, name: string, description?: string, conditions?: Array<string>, actions?: Array<string>);
}
