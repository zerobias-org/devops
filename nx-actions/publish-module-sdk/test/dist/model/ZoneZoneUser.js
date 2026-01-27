import { ObjectSerializer } from './index.js';
/**
* Zone user access configuration
*/
export class ZoneZoneUser {
    'user';
    'schedule';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "user",
            "baseName": "user",
            // false
            // ZoneZoneUserUser
            // ZoneZoneUserUser
            "type": "ZoneZoneUserUser",
            "format": ""
        },
        {
            "name": "schedule",
            "baseName": "schedule",
            // false
            // Schedule
            // Schedule
            "type": "Schedule",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return ZoneZoneUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'ZoneZoneUser');
    }
    constructor(user, schedule) {
        this.user = user;
        this.schedule = schedule;
    }
}
