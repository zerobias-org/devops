import { UserZoneUserZone } from './UserZoneUserZone.js';
import { Schedule } from './Schedule.js';
/**
* Zone with configuration details for a group
*/
export declare class GroupZoneGroup {
    'zone'?: UserZoneUserZone;
    'schedule'?: Schedule;
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
    static newInstance(obj: any): GroupZoneGroup;
    constructor(zone?: UserZoneUserZone, schedule?: Schedule);
}
