import { ZoneZoneUserUser } from './ZoneZoneUserUser.js';
import { Schedule } from './Schedule.js';
/**
* Zone user access configuration
*/
export declare class ZoneZoneUser {
    'user'?: ZoneZoneUserUser;
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
    static newInstance(obj: any): ZoneZoneUser;
    constructor(user?: ZoneZoneUserUser, schedule?: Schedule);
}
