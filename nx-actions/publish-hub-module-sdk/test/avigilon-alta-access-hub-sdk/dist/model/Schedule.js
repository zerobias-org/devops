import { ObjectSerializer } from './index.js';
/**
* Schedule configuration
*/
export class Schedule {
    /**
    * Schedule identifier
    */
    'id';
    /**
    * Schedule name
    */
    'name';
    /**
    * Schedule description
    */
    'description';
    'scheduleType';
    /**
    * Whether schedule is active
    */
    'isActive';
    /**
    * Creation timestamp
    */
    'createdAt';
    /**
    * Last update timestamp
    */
    'updatedAt';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "id",
            "baseName": "id",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "scheduleType",
            "baseName": "scheduleType",
            // false
            // ScheduleType
            // ScheduleType
            "type": "ScheduleType",
            "format": ""
        },
        {
            "name": "isActive",
            "baseName": "isActive",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "createdAt",
            "baseName": "createdAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "updatedAt",
            "baseName": "updatedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        }
    ];
    static getAttributeTypeMap() {
        return Schedule.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'Schedule');
    }
    constructor(id, name, description, scheduleType, isActive, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.scheduleType = scheduleType;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
