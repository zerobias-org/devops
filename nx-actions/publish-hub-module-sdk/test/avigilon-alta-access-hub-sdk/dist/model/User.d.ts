import { UserCustomField } from './UserCustomField.js';
import { UserSite } from './UserSite.js';
import { UserIdentity } from './UserIdentity.js';
import { BuildingFloorUnit } from './BuildingFloorUnit.js';
import { UserGroup } from './UserGroup.js';
import { EnumValue } from '@zerobias-org/types-core-js';
export declare class User {
    /**
    * Unique identifier for the user
    */
    'id': string;
    /**
    * User\'s current status
    */
    'status': User.StatusEnumDef;
    /**
    * OPAL identifier for the user
    */
    'opal'?: string;
    'identity'?: UserIdentity;
    /**
    * Groups the user belongs to
    */
    'groups'?: Array<UserGroup>;
    /**
    * Sites the user has access to
    */
    'sites'?: Array<UserSite>;
    /**
    * Building floor units associated with the user
    */
    'buildingFloorUnits'?: Array<BuildingFloorUnit>;
    /**
    * Whether the user has remote unlock permissions
    */
    'hasRemoteUnlock'?: boolean;
    /**
    * Whether override is allowed for this user
    */
    'isOverrideAllowed'?: boolean;
    /**
    * Access start date
    */
    'startDate'?: Date;
    /**
    * Access end date
    */
    'endDate'?: Date;
    /**
    * Timezone for start/end dates
    */
    'startAndEndDateTimeZoneId'?: string;
    /**
    * External system identifier
    */
    'externalId'?: string;
    /**
    * Person identifier
    */
    'personId'?: string;
    /**
    * Job title
    */
    'title'?: string;
    /**
    * Department
    */
    'department'?: string;
    /**
    * Last activity timestamp
    */
    'lastActivityAt'?: Date;
    /**
    * Last parcel reminder timestamp
    */
    'lastParcelReminderAt'?: Date;
    /**
    * Manual inactivation timestamp
    */
    'manuallyInactivatedAt'?: Date;
    /**
    * Status last updated timestamp
    */
    'statusLastUpdatedAt'?: Date;
    /**
    * Custom field values for the user
    */
    'userCustomFields'?: Array<UserCustomField>;
    /**
    * Timestamp when user was created
    */
    'createdAt'?: Date;
    /**
    * Timestamp when user was last updated
    */
    'updatedAt'?: Date;
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
    static newInstance(obj: any): User;
    constructor(id: string, status: User.StatusEnumDef, opal?: string, identity?: UserIdentity, groups?: Array<UserGroup>, sites?: Array<UserSite>, buildingFloorUnits?: Array<BuildingFloorUnit>, hasRemoteUnlock?: boolean, isOverrideAllowed?: boolean, startDate?: Date, endDate?: Date, startAndEndDateTimeZoneId?: string, externalId?: string, personId?: string, title?: string, department?: string, lastActivityAt?: Date, lastParcelReminderAt?: Date, manuallyInactivatedAt?: Date, statusLastUpdatedAt?: Date, userCustomFields?: Array<UserCustomField>, createdAt?: Date, updatedAt?: Date);
}
export declare namespace User {
    const StatusEnum: {
        /** Active - User account is active and can be used */
        readonly A: EnumValue;
        /** Suspended - User account has been suspended */
        readonly S: EnumValue;
        /** Inactive - User account is inactive */
        readonly I: EnumValue;
        readonly from: (val: string | number) => EnumValue;
        readonly values: EnumValue[];
    };
    type StatusEnumDef = typeof StatusEnum[keyof typeof StatusEnum];
}
