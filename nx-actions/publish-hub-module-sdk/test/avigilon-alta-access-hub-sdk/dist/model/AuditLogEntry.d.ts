import { Email } from '@zerobias-org/types-core-js';
/**
* Audit log entry
*/
export declare class AuditLogEntry {
    /**
    * Unix timestamp of the action
    */
    'timestamp': number;
    /**
    * ISO 8601 formatted timestamp
    */
    'timestampIso'?: Date;
    /**
    * Action performed
    */
    'action'?: string;
    /**
    * Action category
    */
    'category'?: string;
    /**
    * User ID who performed the action
    */
    'actorId'?: string;
    /**
    * Name of user who performed the action
    */
    'actorName'?: string;
    /**
    * Email of user who performed the action
    */
    'actorEmail'?: Email;
    /**
    * ID of the target resource
    */
    'targetId'?: string;
    /**
    * Type of the target resource
    */
    'targetType'?: string;
    /**
    * Name of the target resource
    */
    'targetName'?: string;
    /**
    * Additional action details
    */
    'details'?: object;
    /**
    * IP address of the actor
    */
    'ipAddress'?: string;
    /**
    * User agent string
    */
    'userAgent'?: string;
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
    static newInstance(obj: any): AuditLogEntry;
    constructor(timestamp: number, timestampIso?: Date, action?: string, category?: string, actorId?: string, actorName?: string, actorEmail?: Email, targetId?: string, targetType?: string, targetName?: string, details?: object, ipAddress?: string, userAgent?: string);
}
