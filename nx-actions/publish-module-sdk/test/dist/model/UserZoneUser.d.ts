import { UserZoneUserZone } from './UserZoneUserZone.js';
import { Schedule } from './Schedule.js';
/**
* Zone access configuration for a user
*/
export declare class UserZoneUser {
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
    static newInstance(obj: any): UserZoneUser;
    constructor(zone?: UserZoneUserZone, schedule?: Schedule);
}
