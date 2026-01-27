import { ScheduleType } from './ScheduleType.js';
/**
* Schedule configuration
*/
export declare class Schedule {
    /**
    * Schedule identifier
    */
    'id': string;
    /**
    * Schedule name
    */
    'name': string;
    /**
    * Schedule description
    */
    'description'?: string;
    'scheduleType'?: ScheduleType;
    /**
    * Whether schedule is active
    */
    'isActive'?: boolean;
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
    static newInstance(obj: any): Schedule;
    constructor(id: string, name: string, description?: string, scheduleType?: ScheduleType, isActive?: boolean, createdAt?: Date, updatedAt?: Date);
}
