import { EnumValue } from '@zerobias-org/types-core-js';
export declare class TimeRestriction {
    /**
    * Start time for access
    */
    'startTime'?: Date;
    /**
    * End time for access
    */
    'endTime'?: Date;
    /**
    * Days of the week when access is allowed
    */
    'daysOfWeek'?: Array<TimeRestriction.DaysOfWeekEnumDef>;
    /**
    * Start date for the time restriction
    */
    'validFrom'?: Date;
    /**
    * End date for the time restriction
    */
    'validUntil'?: Date;
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
    static newInstance(obj: any): TimeRestriction;
    constructor(startTime?: Date, endTime?: Date, daysOfWeek?: Array<TimeRestriction.DaysOfWeekEnumDef>, validFrom?: Date, validUntil?: Date);
}
export declare namespace TimeRestriction {
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
