import { ObjectSerializer } from './index.js';
/**
* Zone access configuration for a user
*/
export class UserZoneUser {
    'zone';
    'schedule';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "zone",
            "baseName": "zone",
            // false
            // UserZoneUserZone
            // UserZoneUserZone
            "type": "UserZoneUserZone",
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
        return UserZoneUser.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserZoneUser');
    }
    constructor(zone, schedule) {
        this.zone = zone;
        this.schedule = schedule;
    }
}
