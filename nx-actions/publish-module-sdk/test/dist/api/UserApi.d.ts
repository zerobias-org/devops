import { AxiosInstance } from 'axios';
import { Group, MfaCredential, OrgIdentity, OrgPicture, Role, SharedUser, Site, User, UserActivityEvent, UserCredential, UserEntry, UserInfo, UserPicture, UserZone, UserZoneUser } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace UserApi {
}
/**
 * UserApi - interface
 * @export
 * @interface UserApi
 */
export interface UserApi {
    /**
     *
     * @summary Retrieves single user details by user ID
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.get('organizationId', 'userId');
     * ```
     * @openapi operation=getUser path=/organizations/{organizationId}/users/{userId} method=GET
     * @memberof UserApi
     */
    get(organizationId: string, userId: string): Promise<UserInfo>;
    /**
     *
     * @summary Retrieves all identities in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listOrgIdentities('organizationId', 1, 1);
     * ```
     * @openapi operation=listOrgIdentities path=/organizations/{organizationId}/orgIdentities method=GET
     * @memberof UserApi
     */
    listOrgIdentities(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgIdentity>>;
    /**
     *
     * @summary Retrieves all organization pictures
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listOrgPictures('organizationId', 1, 1);
     * ```
     * @openapi operation=listOrgPictures path=/organizations/{organizationId}/orgPictures method=GET
     * @memberof UserApi
     */
    listOrgPictures(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgPicture>>;
    /**
     *
     * @summary Retrieves all users shared from other organizations
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listSharedUsers('organizationId', 1, 1);
     * ```
     * @openapi operation=listSharedUsers path=/organizations/{organizationId}/sharedUsers method=GET
     * @memberof UserApi
     */
    listSharedUsers(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<SharedUser>>;
    /**
     *
     * @summary Retrieves activity report for a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listActivity('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserActivity path=/organizations/{organizationId}/users/{userId}/activity method=GET
     * @memberof UserApi
     */
    listActivity(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserActivityEvent>>;
    /**
     *
     * @summary Retrieves all credentials for a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCredentials('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserCredentials path=/organizations/{organizationId}/users/{userId}/credentials method=GET
     * @memberof UserApi
     */
    listCredentials(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserCredential>>;
    /**
     *
     * @summary Retrieves all entries/access permissions for a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listEntries('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserEntries path=/organizations/{organizationId}/users/{userId}/entries method=GET
     * @memberof UserApi
     */
    listEntries(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserEntry>>;
    /**
     *
     * @summary Retrieves all groups a specific user belongs to
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listGroups('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserGroups path=/organizations/{organizationId}/users/{userId}/groups method=GET
     * @memberof UserApi
     */
    listGroups(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Group>>;
    /**
     *
     * @summary Retrieves all MFA credentials for a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listMfaCredentials('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserMfaCredentials path=/organizations/{organizationId}/users/{userId}/mfaCredentials method=GET
     * @memberof UserApi
     */
    listMfaCredentials(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<MfaCredential>>;
    /**
     *
     * @summary Retrieves all pictures for a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listPictures('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserPictures path=/organizations/{organizationId}/users/{userId}/userPictures method=GET
     * @memberof UserApi
     */
    listPictures(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserPicture>>;
    /**
     *
     * @summary Retrieves all roles assigned to a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listRoles('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserRoles path=/organizations/{organizationId}/users/{userId}/roles method=GET
     * @memberof UserApi
     */
    listRoles(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Role>>;
    /**
     *
     * @summary Retrieves all sites associated with a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listSites('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserSites path=/organizations/{organizationId}/users/{userId}/sites method=GET
     * @memberof UserApi
     */
    listSites(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Site>>;
    /**
     *
     * @summary Retrieves all zones and their associated configurations a user has access to
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZoneUsers('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserZoneUsers path=/organizations/{organizationId}/users/{userId}/zoneUsers method=GET
     * @memberof UserApi
     */
    listZoneUsers(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserZoneUser>>;
    /**
     *
     * @summary Retrieves all zones associated with a specific user
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} userId Unique identifier for a user
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZones('organizationId', 'userId', 1, 1);
     * ```
     * @openapi operation=listUserZones path=/organizations/{organizationId}/users/{userId}/zones method=GET
     * @memberof UserApi
     */
    listZones(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserZone>>;
    /**
     *
     * @summary Retrieves all users in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.list('organizationId', 1, 1);
     * ```
     * @openapi operation=listUsers path=/organizations/{organizationId}/users method=GET
     * @memberof UserApi
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<User>>;
}
/**
 * UserProducerApi - interface
 * Producer interface for User
 * @export
 * @interface UserProducerApi
 */
export interface UserProducerApi {
    /**
    *
    * @summary Retrieves single user details by user ID
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getUser path=/organizations/{organizationId}/users/{userId} method=GET
    * @memberof User
    */
    get(organizationId: string, userId: string): Promise<UserInfo>;
    /**
    *
    * @summary Retrieves all identities in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listOrgIdentities path=/organizations/{organizationId}/orgIdentities method=GET
    * @memberof User
    */
    listOrgIdentities(results: PagedResults<OrgIdentity>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all organization pictures
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listOrgPictures path=/organizations/{organizationId}/orgPictures method=GET
    * @memberof User
    */
    listOrgPictures(results: PagedResults<OrgPicture>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all users shared from other organizations
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listSharedUsers path=/organizations/{organizationId}/sharedUsers method=GET
    * @memberof User
    */
    listSharedUsers(results: PagedResults<SharedUser>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves activity report for a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserActivity path=/organizations/{organizationId}/users/{userId}/activity method=GET
    * @memberof User
    */
    listActivity(results: PagedResults<UserActivityEvent>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all credentials for a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserCredentials path=/organizations/{organizationId}/users/{userId}/credentials method=GET
    * @memberof User
    */
    listCredentials(results: PagedResults<UserCredential>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all entries/access permissions for a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserEntries path=/organizations/{organizationId}/users/{userId}/entries method=GET
    * @memberof User
    */
    listEntries(results: PagedResults<UserEntry>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all groups a specific user belongs to
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserGroups path=/organizations/{organizationId}/users/{userId}/groups method=GET
    * @memberof User
    */
    listGroups(results: PagedResults<Group>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all MFA credentials for a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserMfaCredentials path=/organizations/{organizationId}/users/{userId}/mfaCredentials method=GET
    * @memberof User
    */
    listMfaCredentials(results: PagedResults<MfaCredential>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all pictures for a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserPictures path=/organizations/{organizationId}/users/{userId}/userPictures method=GET
    * @memberof User
    */
    listPictures(results: PagedResults<UserPicture>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all roles assigned to a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserRoles path=/organizations/{organizationId}/users/{userId}/roles method=GET
    * @memberof User
    */
    listRoles(results: PagedResults<Role>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all sites associated with a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserSites path=/organizations/{organizationId}/users/{userId}/sites method=GET
    * @memberof User
    */
    listSites(results: PagedResults<Site>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zones and their associated configurations a user has access to
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserZoneUsers path=/organizations/{organizationId}/users/{userId}/zoneUsers method=GET
    * @memberof User
    */
    listZoneUsers(results: PagedResults<UserZoneUser>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zones associated with a specific user
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} userId Unique identifier for a user
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUserZones path=/organizations/{organizationId}/users/{userId}/zones method=GET
    * @memberof User
    */
    listZones(results: PagedResults<UserZone>, organizationId: string, userId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all users in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listUsers path=/organizations/{organizationId}/users method=GET
    * @memberof User
    */
    list(results: PagedResults<User>, organizationId: string): Promise<void>;
}
export declare class UserApiMappingImpl implements UserApi {
    private producer;
    constructor(producer: UserProducerApi);
    /**
     *
     * @summary Retrieves single user details by user ID
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @openapi operation=getUser path=/organizations/{organizationId}/users/{userId} method=GET
     */
    get(organizationId: string, userId: string): Promise<UserInfo>;
    /**
     *
     * @summary Retrieves all identities in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listOrgIdentities path=/organizations/{organizationId}/orgIdentities method=GET
     */
    listOrgIdentities(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgIdentity>>;
    /**
     *
     * @summary Retrieves all organization pictures
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listOrgPictures path=/organizations/{organizationId}/orgPictures method=GET
     */
    listOrgPictures(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgPicture>>;
    /**
     *
     * @summary Retrieves all users shared from other organizations
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listSharedUsers path=/organizations/{organizationId}/sharedUsers method=GET
     */
    listSharedUsers(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<SharedUser>>;
    /**
     *
     * @summary Retrieves activity report for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserActivity path=/organizations/{organizationId}/users/{userId}/activity method=GET
     */
    listActivity(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserActivityEvent>>;
    /**
     *
     * @summary Retrieves all credentials for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserCredentials path=/organizations/{organizationId}/users/{userId}/credentials method=GET
     */
    listCredentials(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserCredential>>;
    /**
     *
     * @summary Retrieves all entries/access permissions for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserEntries path=/organizations/{organizationId}/users/{userId}/entries method=GET
     */
    listEntries(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserEntry>>;
    /**
     *
     * @summary Retrieves all groups a specific user belongs to
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserGroups path=/organizations/{organizationId}/users/{userId}/groups method=GET
     */
    listGroups(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Group>>;
    /**
     *
     * @summary Retrieves all MFA credentials for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserMfaCredentials path=/organizations/{organizationId}/users/{userId}/mfaCredentials method=GET
     */
    listMfaCredentials(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<MfaCredential>>;
    /**
     *
     * @summary Retrieves all pictures for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserPictures path=/organizations/{organizationId}/users/{userId}/userPictures method=GET
     */
    listPictures(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserPicture>>;
    /**
     *
     * @summary Retrieves all roles assigned to a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserRoles path=/organizations/{organizationId}/users/{userId}/roles method=GET
     */
    listRoles(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Role>>;
    /**
     *
     * @summary Retrieves all sites associated with a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserSites path=/organizations/{organizationId}/users/{userId}/sites method=GET
     */
    listSites(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Site>>;
    /**
     *
     * @summary Retrieves all zones and their associated configurations a user has access to
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserZoneUsers path=/organizations/{organizationId}/users/{userId}/zoneUsers method=GET
     */
    listZoneUsers(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserZoneUser>>;
    /**
     *
     * @summary Retrieves all zones associated with a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserZones path=/organizations/{organizationId}/users/{userId}/zones method=GET
     */
    listZones(organizationId: string, userId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<UserZone>>;
    /**
     *
     * @summary Retrieves all users in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUsers path=/organizations/{organizationId}/users method=GET
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<User>>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapUserProducer(producer: UserProducerApi): UserApi;
/**
 * UserApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class UserApiHttpImpl implements UserProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    get(organizationId: string, userId: string): Promise<UserInfo>;
    listOrgIdentities(results: PagedResults<OrgIdentity>, organizationId: string): Promise<void>;
    listOrgPictures(results: PagedResults<OrgPicture>, organizationId: string): Promise<void>;
    listSharedUsers(results: PagedResults<SharedUser>, organizationId: string): Promise<void>;
    listActivity(results: PagedResults<UserActivityEvent>, organizationId: string, userId: string): Promise<void>;
    listCredentials(results: PagedResults<UserCredential>, organizationId: string, userId: string): Promise<void>;
    listEntries(results: PagedResults<UserEntry>, organizationId: string, userId: string): Promise<void>;
    listGroups(results: PagedResults<Group>, organizationId: string, userId: string): Promise<void>;
    listMfaCredentials(results: PagedResults<MfaCredential>, organizationId: string, userId: string): Promise<void>;
    listPictures(results: PagedResults<UserPicture>, organizationId: string, userId: string): Promise<void>;
    listRoles(results: PagedResults<Role>, organizationId: string, userId: string): Promise<void>;
    listSites(results: PagedResults<Site>, organizationId: string, userId: string): Promise<void>;
    listZoneUsers(results: PagedResults<UserZoneUser>, organizationId: string, userId: string): Promise<void>;
    listZones(results: PagedResults<UserZone>, organizationId: string, userId: string): Promise<void>;
    list(results: PagedResults<User>, organizationId: string): Promise<void>;
}
