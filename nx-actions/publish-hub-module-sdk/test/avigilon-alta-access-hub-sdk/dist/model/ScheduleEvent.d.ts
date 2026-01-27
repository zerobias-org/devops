import { EnumValue } from '@zerobias-org/types-core-js';
/**
* Event in a schedule
*/
export declare class ScheduleEvent {
    /**
    * Event identifier
    */
    'id': string;
    /**
    * Schedule identifier
    */
    'scheduleId'?: string;
    /**
    * Event start time
    */
    'startTime'?: Date;
    /**
    * Event end time
    */
    'endTime'?: Date;
    /**
    * Days of the week for recurring events
    */
    'daysOfWeek'?: Array<ScheduleEvent.DaysOfWeekEnumDef>;
    /**
    * Whether event recurs
    */
    'isRecurring'?: boolean;
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
    static newInstance(obj: any): ScheduleEvent;
    constructor(id: string, scheduleId?: string, startTime?: Date, endTime?: Date, daysOfWeek?: Array<ScheduleEvent.DaysOfWeekEnumDef>, isRecurring?: boolean, createdAt?: Date, updatedAt?: Date);
}
export declare namespace ScheduleEvent {
    const DaysOfWeekEnum: {
        /**  */
        readonly Monday: EnumValue;
        /**  */
        readonly Tuesday: EnumValue;
        /**  */
        readonly Wednesday: EnumValue;
        /**  */
        readonly Thursday: EnumValue;
        /**  */
        readonly Friday: EnumValue;
        /**  */
        readonly Saturday: EnumValue;
        /**  */
        readonly Sunday: EnumValue;
        readonly from: (val: string | number) => EnumValue;
        readonly values: EnumValue[];
    };
    type DaysOfWeekEnumDef = typeof DaysOfWeekEnum[keyof typeof DaysOfWeekEnum];
}
