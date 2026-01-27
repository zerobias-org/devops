import { ObjectSerializer } from './index.js';
/**
* Audit log entry
*/
export class AuditLogEntry {
    /**
    * Unix timestamp of the action
    */
    'timestamp';
    /**
    * ISO 8601 formatted timestamp
    */
    'timestampIso';
    /**
    * Action performed
    */
    'action';
    /**
    * Action category
    */
    'category';
    /**
    * User ID who performed the action
    */
    'actorId';
    /**
    * Name of user who performed the action
    */
    'actorName';
    /**
    * Email of user who performed the action
    */
    'actorEmail';
    /**
    * ID of the target resource
    */
    'targetId';
    /**
    * Type of the target resource
    */
    'targetType';
    /**
    * Name of the target resource
    */
    'targetName';
    /**
    * Additional action details
    */
    'details';
    /**
    * IP address of the actor
    */
    'ipAddress';
    /**
    * User agent string
    */
    'userAgent';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "timestamp",
            "baseName": "timestamp",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "timestampIso",
            "baseName": "timestampIso",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "action",
            "baseName": "action",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "category",
            "baseName": "category",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "actorId",
            "baseName": "actorId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "actorName",
            "baseName": "actorName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "actorEmail",
            "baseName": "actorEmail",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
        },
        {
            "name": "targetId",
            "baseName": "targetId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "targetType",
            "baseName": "targetType",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "targetName",
            "baseName": "targetName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "details",
            "baseName": "details",
            // false
            // object
            // object
            "type": "object",
            "format": ""
        },
        {
            "name": "ipAddress",
            "baseName": "ipAddress",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userAgent",
            "baseName": "userAgent",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return AuditLogEntry.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'AuditLogEntry');
    }
    constructor(timestamp, timestampIso, action, category, actorId, actorName, actorEmail, targetId, targetType, targetName, details, ipAddress, userAgent) {
        this.timestamp = timestamp;
        this.timestampIso = timestampIso;
        this.action = action;
        this.category = category;
        this.actorId = actorId;
        this.actorName = actorName;
        this.actorEmail = actorEmail;
        this.targetId = targetId;
        this.targetType = targetType;
        this.targetName = targetName;
        this.details = details;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
    }
}
