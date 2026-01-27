/**
* Type of schedule
*/
export declare class ScheduleType {
    /**
    * Schedule type identifier
    */
    'id': string;
    /**
    * Schedule type name
    */
    'name'?: string;
    /**
    * Schedule type code
    */
    'code'?: string;
    /**
    * Schedule type description
    */
    'description'?: string;
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
    static newInstance(obj: any): ScheduleType;
    constructor(id: string, name?: string, code?: string, description?: string);
}
