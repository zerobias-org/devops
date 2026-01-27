import { EnumValue, IllegalArgumentError } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from './index.js';
export class UserInfo {
    /**
    * Unique identifier for the user
    */
    'id';
    /**
    * User\'s current status
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
    /**
    * Organization ID the user belongs to
    */
    'organizationId';
    /**
    * URL to user\'s avatar image
    */
    'avatarUrl';
    /**
    * Timestamp of user\'s last login
    */
    'lastLoginAt';
    /**
    * List of user permissions
    */
    'permissions';
    /**
    * Custom field values for the user
    */
    'customFields';
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
            // UserInfo.StatusEnum
            // UserInfo.StatusEnumDef
            "type": "UserInfo.StatusEnum",
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
        },
        {
            "name": "organizationId",
            "baseName": "organizationId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "avatarUrl",
            "baseName": "avatarUrl",
            // false
            // URL
            // URL
            "type": "URL",
            "format": "url"
        },
        {
            "name": "lastLoginAt",
            "baseName": "lastLoginAt",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "permissions",
            "baseName": "permissions",
            // false
            // Array&lt;string&gt;
            // Array&lt;string&gt;
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "customFields",
            "baseName": "customFields",
            // false
            // Array&lt;UserCustomField&gt;
            // Array&lt;UserCustomField&gt;
            "type": "Array<UserCustomField>",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return UserInfo.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'UserInfo');
    }
    constructor(id, status, opal, identity, groups, sites, buildingFloorUnits, hasRemoteUnlock, isOverrideAllowed, startDate, endDate, startAndEndDateTimeZoneId, externalId, personId, title, department, lastActivityAt, lastParcelReminderAt, manuallyInactivatedAt, statusLastUpdatedAt, userCustomFields, createdAt, updatedAt, organizationId, avatarUrl, lastLoginAt, permissions, customFields) {
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
        this.organizationId = organizationId;
        this.avatarUrl = avatarUrl;
        this.lastLoginAt = lastLoginAt;
        this.permissions = permissions;
        this.customFields = customFields;
    }
}
(function (UserInfo) {
    UserInfo.StatusEnum = {
        /** Active - User account is active and can be used */
        A: EnumValue.instance('UserInfo.StatusEnum', 'A', 'a', 'Active - User account is active and can be used'),
        /** Suspended - User account has been suspended */
        S: EnumValue.instance('UserInfo.StatusEnum', 'S', 's', 'Suspended - User account has been suspended'),
        /** Inactive - User account is inactive */
        I: EnumValue.instance('UserInfo.StatusEnum', 'I', 'i', 'Inactive - User account is inactive'),
        from(val) {
            if (UserInfo.StatusEnum[val]) {
                return UserInfo.StatusEnum[val];
            }
            const byValue = UserInfo.StatusEnum.values.find((v) => v.value === val);
            if (byValue) {
                return byValue;
            }
            throw new IllegalArgumentError(`${val} is not a valid StatusEnum`);
        },
        get values() {
            return Object
                .keys(UserInfo.StatusEnum)
                .filter((k) => k !== 'values' && k !== 'from')
                .map((t) => UserInfo.StatusEnum[t]);
        }
    };
})(UserInfo || (UserInfo = {}));
