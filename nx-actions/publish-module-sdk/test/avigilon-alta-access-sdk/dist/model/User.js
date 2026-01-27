import { EnumValue, IllegalArgumentError } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from './index.js';
export class User {
    /**
    * Unique identifier for the user
    */
    'id';
    /**
    * User's current status
    */
    'status';
    /**
    * OPAL identifier for the user
    */
    'opal';
    'identity';
    /**
    * Groups the user belongs to
    */
    'groups';
    /**
    * Sites the user has access to
    */
    'sites';
    /**
    * Building floor units associated with the user
    */
    'buildingFloorUnits';
    /**
    * Whether the user has remote unlock permissions
    */
    'hasRemoteUnlock';
    /**
    * Whether override is allowed for this user
    */
    'isOverrideAllowed';
    /**
    * Access start date
    */
    'startDate';
    /**
    * Access end date
    */
    'endDate';
    /**
    * Timezone for start/end dates
    */
    'startAndEndDateTimeZoneId';
    /**
    * External system identifier
    */
    'externalId';
    /**
    * Person identifier
    */
    'personId';
    /**
    * Job title
    */
    'title';
    /**
    * Department
    */
    'department';
    /**
    * Last activity timestamp
    */
    'lastActivityAt';
    /**
    * Last parcel reminder timestamp
    */
    'lastParcelReminderAt';
    /**
    * Manual inactivation timestamp
    */
    'manuallyInactivatedAt';
    /**
    * Status last updated timestamp
    */
    'statusLastUpdatedAt';
    /**
    * Custom field values for the user
    */
    'userCustomFields';
    /**
    * Timestamp when user was created
    */
    'createdAt';
    /**
    * Timestamp when user was last updated
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
            "name": "status",
            "baseName": "status",
            // true
            // User.StatusEnum
            // User.StatusEnumDef
            "type": "User.StatusEnum",
            "format": ""
        },
        {
            "name": "opal",
            "baseName": "opal",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "identity",
            "baseName": "identity",
            // false
            // UserIdentity
            // UserIdentity
            "type": "UserIdentity",
            "format": ""
        },
        {
            "name": "groups",
            "baseName": "groups",
            // false
            // Array&lt;UserGroup&gt;
            // Array&lt;UserGroup&gt;
            "type": "Array<UserGroup>",
            "format": ""
        },
        {
            "name": "sites",
            "baseName": "sites",
            // false
            // Array&lt;UserSite&gt;
            // Array&lt;UserSite&gt;
            "type": "Array<UserSite>",
            "format": ""
        },
        {
            "name": "buildingFloorUnits",
            "baseName": "buildingFloorUnits",
            // false
            // Array&lt;BuildingFloorUnit&gt;
            // Array&lt;BuildingFloorUnit&gt;
            "type": "Array<BuildingFloorUnit>",
            "format": ""
        },
        {
            "name": "hasRemoteUnlock",
            "baseName": "hasRemoteUnlock",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "isOverrideAllowed",
            "baseName": "isOverrideAllowed",
            // false
            // boolean
            // boolean
            "type": "boolean",
            "format": ""
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date"
        },
        {
            "name": "startAndEndDateTimeZoneId",
            "baseName": "startAndEndDateTimeZoneId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "externalId",
            "baseName": "externalId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "personId",
            "baseName": "personId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "title",
            "baseName": "title",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "department",
            "baseName": "department",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "lastActivityAt",
            "baseName": "lastActivityAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "lastParcelReminderAt",
            "baseName": "lastParcelReminderAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "manuallyInactivatedAt",
            "baseName": "manuallyInactivatedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "statusLastUpdatedAt",
            "baseName": "statusLastUpdatedAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "userCustomFields",
            "baseName": "userCustomFields",
            // false
            // Array&lt;UserCustomField&gt;
            // Array&lt;UserCustomField&gt;
            "type": "Array<UserCustomField>",
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
        return User.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'User');
    }
    constructor(id, status, opal, identity, groups, sites, buildingFloorUnits, hasRemoteUnlock, isOverrideAllowed, startDate, endDate, startAndEndDateTimeZoneId, externalId, personId, title, department, lastActivityAt, lastParcelReminderAt, manuallyInactivatedAt, statusLastUpdatedAt, userCustomFields, createdAt, updatedAt) {
        this.id = id;
        this.status = status;
        this.opal = opal;
        this.identity = identity;
        this.groups = groups;
        this.sites = sites;
        this.buildingFloorUnits = buildingFloorUnits;
        this.hasRemoteUnlock = hasRemoteUnlock;
        this.isOverrideAllowed = isOverrideAllowed;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startAndEndDateTimeZoneId = startAndEndDateTimeZoneId;
        this.externalId = externalId;
        this.personId = personId;
        this.title = title;
        this.department = department;
        this.lastActivityAt = lastActivityAt;
        this.lastParcelReminderAt = lastParcelReminderAt;
        this.manuallyInactivatedAt = manuallyInactivatedAt;
        this.statusLastUpdatedAt = statusLastUpdatedAt;
        this.userCustomFields = userCustomFields;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
(function (User) {
    User.StatusEnum = {
        /** Active - User account is active and can be used */
        A: EnumValue.instance('User.StatusEnum', 'A', 'a'),
        /** Suspended - User account has been suspended */
        S: EnumValue.instance('User.StatusEnum', 'S', 's'),
        /** Inactive - User account is inactive */
        I: EnumValue.instance('User.StatusEnum', 'I', 'i'),
        from(val) {
            if (User.StatusEnum[val]) {
                return User.StatusEnum[val];
            }
            const byValue = User.StatusEnum.values.find((v) => v.value === val);
            if (byValue) {
                return byValue;
            }
            throw new IllegalArgumentError(`${val} is not a valid StatusEnum`);
        },
        get values() {
            return Object
                .keys(User.StatusEnum)
                .filter((k) => k !== 'values' && k !== 'from')
                .map((t) => User.StatusEnum[t]);
        }
    };
})(User || (User = {}));
