import { EntryActivityEventUserSites } from './EntryActivityEventUserSites.js';
import { EntryActivityEventUserGroups } from './EntryActivityEventUserGroups.js';
import { Email } from '@zerobias-org/types-core-js';
/**
* Activity event at an entry
*/
export declare class EntryActivityEvent {
    /**
    * Unix timestamp of the event
    */
    'time': number;
    /**
    * Source of the activity event
    */
    'sourceName': string;
    /**
    * ISO 8601 formatted timestamp
    */
    'timeIsoString'?: Date;
    /**
    * User identifier
    */
    'userId'?: string;
    /**
    * User's first name
    */
    'userFirstName'?: string;
    /**
    * User's middle name
    */
    'userMiddleName'?: string;
    /**
    * User's last name
    */
    'userLastName'?: string;
    /**
    * User's full name
    */
    'userName'?: string;
    /**
    * User's email address
    */
    'userEmail'?: Email;
    /**
    * User's mobile phone
    */
    'userMobilePhone'?: string;
    /**
    * User's organization identifier
    */
    'userOrgId'?: string;
    /**
    * User's organization name
    */
    'userOrgName'?: string;
    /**
    * User's external identifier
    */
    'userExternalId'?: string;
    /**
    * Identity provider name
    */
    'userIdpName'?: string;
    /**
    * User's groups
    */
    'userGroups'?: Array<EntryActivityEventUserGroups>;
    /**
    * User's sites
    */
    'userSites'?: Array<EntryActivityEventUserSites>;
    /**
    * Event category
    */
    'category'?: string;
    /**
    * Event sub-category
    */
    'subCategory'?: string;
    /**
    * Type of credential used
    */
    'credentialSubtype'?: string;
    /**
    * Model name of credential type
    */
    'credentialTypeModelName'?: string;
    /**
    * Name of credential type
    */
    'credentialTypeName'?: string;
    /**
    * Detailed credential information
    */
    'credentialDetail'?: string;
    /**
    * Entry identifier where event occurred
    */
    'entryId'?: string;
    /**
    * Entry name where event occurred
    */
    'entryName'?: string;
    /**
    * Zone identifier where event occurred
    */
    'zoneId'?: string;
    /**
    * Zone name where event occurred
    */
    'zoneName'?: string;
    /**
    * Site identifier where event occurred
    */
    'siteId'?: string;
    /**
    * Site name where event occurred
    */
    'siteName'?: string;
    /**
    * Type of access request
    */
    'requestType'?: string;
    /**
    * Result of the access attempt
    */
    'result'?: string;
    /**
    * Detailed description of the result
    */
    'resultDescription'?: string;
    /**
    * Reason for access denial if applicable
    */
    'deniedReason'?: string;
    /**
    * Location information for the event
    */
    'location'?: string;
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
    static newInstance(obj: any): EntryActivityEvent;
    constructor(time: number, sourceName: string, timeIsoString?: Date, userId?: string, userFirstName?: string, userMiddleName?: string, userLastName?: string, userName?: string, userEmail?: Email, userMobilePhone?: string, userOrgId?: string, userOrgName?: string, userExternalId?: string, userIdpName?: string, userGroups?: Array<EntryActivityEventUserGroups>, userSites?: Array<EntryActivityEventUserSites>, category?: string, subCategory?: string, credentialSubtype?: string, credentialTypeModelName?: string, credentialTypeName?: string, credentialDetail?: string, entryId?: string, entryName?: string, zoneId?: string, zoneName?: string, siteId?: string, siteName?: string, requestType?: string, result?: string, resultDescription?: string, deniedReason?: string, location?: string);
}
