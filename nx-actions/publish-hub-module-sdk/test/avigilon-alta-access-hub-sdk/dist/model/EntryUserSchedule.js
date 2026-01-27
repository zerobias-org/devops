import { ObjectSerializer } from './index.js';
/**
* User with schedule information for entry access
*/
export class EntryUserSchedule {
    'user';
    /**
    * Schedules for entry access
    */
    'schedules';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "user",
            "baseName": "user",
            // false
            // EntryUserScheduleUser
            // EntryUserScheduleUser
            "type": "EntryUserScheduleUser",
            "format": ""
        },
        {
            "name": "schedules",
            "baseName": "schedules",
            // false
            // Array&lt;EntrySchedule&gt;
            // Array&lt;EntrySchedule&gt;
            "type": "Array<EntrySchedule>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryUserSchedule.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryUserSchedule');
    }
    constructor(user, schedules) {
        this.user = user;
        this.schedules = schedules;
    }
}
