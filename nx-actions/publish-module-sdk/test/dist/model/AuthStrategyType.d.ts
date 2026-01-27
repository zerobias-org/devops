/**
* Authentication strategy type
*/
export declare class AuthStrategyType {
    /**
    * Auth strategy type identifier
    */
    'id': string;
    /**
    * Auth strategy type name
    */
    'name'?: string;
    /**
    * Auth strategy type code
    */
    'code'?: string;
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
    static newInstance(obj: any): AuthStrategyType;
    constructor(id: string, name?: string, code?: string);
}
