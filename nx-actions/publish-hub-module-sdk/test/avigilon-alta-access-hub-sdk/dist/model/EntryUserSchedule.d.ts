import { EntryUserScheduleUser } from './EntryUserScheduleUser.js';
import { EntrySchedule } from './EntrySchedule.js';
/**
* User with schedule information for entry access
*/
export declare class EntryUserSchedule {
    'user'?: EntryUserScheduleUser;
    /**
    * Schedules for entry access
    */
    'schedules'?: Array<EntrySchedule>;
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
    static newInstance(obj: any): EntryUserSchedule;
    constructor(user?: EntryUserScheduleUser, schedules?: Array<EntrySchedule>);
}
