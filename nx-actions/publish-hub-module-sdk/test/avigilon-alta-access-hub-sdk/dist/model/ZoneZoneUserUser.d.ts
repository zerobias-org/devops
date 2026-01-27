import { UserIdentity } from './UserIdentity.js';
export declare class ZoneZoneUserUser {
    /**
    * User identifier
    */
    'id': string;
    /**
    * User status
    */
    'status'?: string;
    'identity'?: UserIdentity;
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
    static newInstance(obj: any): ZoneZoneUserUser;
    constructor(id: string, status?: string, identity?: UserIdentity);
}
