import { ObjectSerializer } from './index.js';
/**
* Zone with configuration details for a group
*/
export class GroupZoneGroup {
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
        return GroupZoneGroup.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'GroupZoneGroup');
    }
    constructor(zone, schedule) {
        this.zone = zone;
        this.schedule = schedule;
    }
}
