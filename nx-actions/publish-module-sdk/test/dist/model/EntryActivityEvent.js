import { ObjectSerializer } from './index.js';
/**
* Activity event at an entry
*/
export class EntryActivityEvent {
    /**
    * Unix timestamp of the event
    */
    'time';
    /**
    * Source of the activity event
    */
    'sourceName';
    /**
    * ISO 8601 formatted timestamp
    */
    'timeIsoString';
    /**
    * User identifier
    */
    'userId';
    /**
    * User's first name
    */
    'userFirstName';
    /**
    * User's middle name
    */
    'userMiddleName';
    /**
    * User's last name
    */
    'userLastName';
    /**
    * User's full name
    */
    'userName';
    /**
    * User's email address
    */
    'userEmail';
    /**
    * User's mobile phone
    */
    'userMobilePhone';
    /**
    * User's organization identifier
    */
    'userOrgId';
    /**
    * User's organization name
    */
    'userOrgName';
    /**
    * User's external identifier
    */
    'userExternalId';
    /**
    * Identity provider name
    */
    'userIdpName';
    /**
    * User's groups
    */
    'userGroups';
    /**
    * User's sites
    */
    'userSites';
    /**
    * Event category
    */
    'category';
    /**
    * Event sub-category
    */
    'subCategory';
    /**
    * Type of credential used
    */
    'credentialSubtype';
    /**
    * Model name of credential type
    */
    'credentialTypeModelName';
    /**
    * Name of credential type
    */
    'credentialTypeName';
    /**
    * Detailed credential information
    */
    'credentialDetail';
    /**
    * Entry identifier where event occurred
    */
    'entryId';
    /**
    * Entry name where event occurred
    */
    'entryName';
    /**
    * Zone identifier where event occurred
    */
    'zoneId';
    /**
    * Zone name where event occurred
    */
    'zoneName';
    /**
    * Site identifier where event occurred
    */
    'siteId';
    /**
    * Site name where event occurred
    */
    'siteName';
    /**
    * Type of access request
    */
    'requestType';
    /**
    * Result of the access attempt
    */
    'result';
    /**
    * Detailed description of the result
    */
    'resultDescription';
    /**
    * Reason for access denial if applicable
    */
    'deniedReason';
    /**
    * Location information for the event
    */
    'location';
    static discriminator = undefined;
    static attributeTypeMap = [
        {
            "name": "time",
            "baseName": "time",
            // false
            // number
            // number
            "type": "number",
            "format": ""
        },
        {
            "name": "sourceName",
            "baseName": "sourceName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "timeIsoString",
            "baseName": "timeIsoString",
            // false
            // Date
            // Date
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "userId",
            "baseName": "userId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userFirstName",
            "baseName": "userFirstName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userMiddleName",
            "baseName": "userMiddleName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userLastName",
            "baseName": "userLastName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userName",
            "baseName": "userName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userEmail",
            "baseName": "userEmail",
            // false
            // Email
            // Email
            "type": "Email",
            "format": "email"
        },
        {
            "name": "userMobilePhone",
            "baseName": "userMobilePhone",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userOrgId",
            "baseName": "userOrgId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userOrgName",
            "baseName": "userOrgName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userExternalId",
            "baseName": "userExternalId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userIdpName",
            "baseName": "userIdpName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "userGroups",
            "baseName": "userGroups",
            // false
            // Array&lt;EntryActivityEventUserGroups&gt;
            // Array&lt;EntryActivityEventUserGroups&gt;
            "type": "Array<EntryActivityEventUserGroups>",
            "format": ""
        },
        {
            "name": "userSites",
            "baseName": "userSites",
            // false
            // Array&lt;EntryActivityEventUserSites&gt;
            // Array&lt;EntryActivityEventUserSites&gt;
            "type": "Array<EntryActivityEventUserSites>",
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
            "name": "subCategory",
            "baseName": "subCategory",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "credentialSubtype",
            "baseName": "credentialSubtype",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "credentialTypeModelName",
            "baseName": "credentialTypeModelName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "credentialTypeName",
            "baseName": "credentialTypeName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "credentialDetail",
            "baseName": "credentialDetail",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "entryId",
            "baseName": "entryId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "entryName",
            "baseName": "entryName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "zoneId",
            "baseName": "zoneId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "zoneName",
            "baseName": "zoneName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "siteId",
            "baseName": "siteId",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "siteName",
            "baseName": "siteName",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "requestType",
            "baseName": "requestType",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "result",
            "baseName": "result",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "resultDescription",
            "baseName": "resultDescription",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "deniedReason",
            "baseName": "deniedReason",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        },
        {
            "name": "location",
            "baseName": "location",
            // false
            // string
            // string
            "type": "string",
            "format": ""
        }
    ];
    static getAttributeTypeMap() {
        return EntryActivityEvent.attributeTypeMap;
    }
    static newInstance(obj) {
        return ObjectSerializer.deserialize(obj, 'EntryActivityEvent');
    }
    constructor(time, sourceName, timeIsoString, userId, userFirstName, userMiddleName, userLastName, userName, userEmail, userMobilePhone, userOrgId, userOrgName, userExternalId, userIdpName, userGroups, userSites, category, subCategory, credentialSubtype, credentialTypeModelName, credentialTypeName, credentialDetail, entryId, entryName, zoneId, zoneName, siteId, siteName, requestType, result, resultDescription, deniedReason, location) {
        this.time = time;
        this.sourceName = sourceName;
        this.timeIsoString = timeIsoString;
        this.userId = userId;
        this.userFirstName = userFirstName;
        this.userMiddleName = userMiddleName;
        this.userLastName = userLastName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userMobilePhone = userMobilePhone;
        this.userOrgId = userOrgId;
        this.userOrgName = userOrgName;
        this.userExternalId = userExternalId;
        this.userIdpName = userIdpName;
        this.userGroups = userGroups;
        this.userSites = userSites;
        this.category = category;
        this.subCategory = subCategory;
        this.credentialSubtype = credentialSubtype;
        this.credentialTypeModelName = credentialTypeModelName;
        this.credentialTypeName = credentialTypeName;
        this.credentialDetail = credentialDetail;
        this.entryId = entryId;
        this.entryName = entryName;
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.siteId = siteId;
        this.siteName = siteName;
        this.requestType = requestType;
        this.result = result;
        this.resultDescription = resultDescription;
        this.deniedReason = deniedReason;
        this.location = location;
    }
}
