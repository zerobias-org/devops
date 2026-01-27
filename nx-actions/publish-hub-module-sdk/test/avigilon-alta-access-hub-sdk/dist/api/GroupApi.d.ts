import { AxiosInstance } from 'axios';
import { Entry, Group, GroupInfo, GroupZone, GroupZoneGroup, User } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace GroupApi {
}
/**
 * GroupApi - interface
 * @export
 * @interface GroupApi
 */
export interface GroupApi {
    /**
     *
     * @summary Retrieves single access group details by group ID
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} groupId Unique identifier for a group
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.get('organizationId', 'groupId');
     * ```
     * @openapi operation=getGroup path=/organizations/{organizationId}/groups/{groupId} method=GET
     * @memberof GroupApi
     */
    get(organizationId: string, groupId: string): Promise<GroupInfo>;
    /**
     *
     * @summary Retrieves all entries/permissions for a specific group
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} groupId Unique identifier for a group
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listEntries('organizationId', 'groupId', 1, 1);
     * ```
     * @openapi operation=listGroupEntries path=/organizations/{organizationId}/groups/{groupId}/entries method=GET
     * @memberof GroupApi
     */
    listEntries(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Entry>>;
    /**
     *
     * @summary Retrieves all users belonging to a specific group
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} groupId Unique identifier for a group
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listUsers('organizationId', 'groupId', 1, 1);
     * ```
     * @openapi operation=listGroupUsers path=/organizations/{organizationId}/groups/{groupId}/users method=GET
     * @memberof GroupApi
     */
    listUsers(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<User>>;
    /**
     *
     * @summary Retrieves all zones and their associated configurations for a specific group
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} groupId Unique identifier for a group
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZoneGroups('organizationId', 'groupId', 1, 1);
     * ```
     * @openapi operation=listGroupZoneGroups path=/organizations/{organizationId}/groups/{groupId}/zoneGroups method=GET
     * @memberof GroupApi
     */
    listZoneGroups(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<GroupZoneGroup>>;
    /**
     *
     * @summary Retrieves all zones for a specific group
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} groupId Unique identifier for a group
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZones('organizationId', 'groupId', 1, 1);
     * ```
     * @openapi operation=listGroupZones path=/organizations/{organizationId}/groups/{groupId}/zones method=GET
     * @memberof GroupApi
     */
    listZones(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<GroupZone>>;
    /**
     *
     * @summary Retrieves all access groups in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.list('organizationId', 1, 1);
     * ```
     * @openapi operation=listGroups path=/organizations/{organizationId}/groups method=GET
     * @memberof GroupApi
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Group>>;
}
/**
 * GroupProducerApi - interface
 * Producer interface for Group
 * @export
 * @interface GroupProducerApi
 */
export interface GroupProducerApi {
    /**
    *
    * @summary Retrieves single access group details by group ID
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} groupId Unique identifier for a group
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getGroup path=/organizations/{organizationId}/groups/{groupId} method=GET
    * @memberof Group
    */
    get(organizationId: string, groupId: string): Promise<GroupInfo>;
    /**
    *
    * @summary Retrieves all entries/permissions for a specific group
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} groupId Unique identifier for a group
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listGroupEntries path=/organizations/{organizationId}/groups/{groupId}/entries method=GET
    * @memberof Group
    */
    listEntries(results: PagedResults<Entry>, organizationId: string, groupId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all users belonging to a specific group
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} groupId Unique identifier for a group
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listGroupUsers path=/organizations/{organizationId}/groups/{groupId}/users method=GET
    * @memberof Group
    */
    listUsers(results: PagedResults<User>, organizationId: string, groupId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zones and their associated configurations for a specific group
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} groupId Unique identifier for a group
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listGroupZoneGroups path=/organizations/{organizationId}/groups/{groupId}/zoneGroups method=GET
    * @memberof Group
    */
    listZoneGroups(results: PagedResults<GroupZoneGroup>, organizationId: string, groupId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zones for a specific group
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} groupId Unique identifier for a group
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listGroupZones path=/organizations/{organizationId}/groups/{groupId}/zones method=GET
    * @memberof Group
    */
    listZones(results: PagedResults<GroupZone>, organizationId: string, groupId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all access groups in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listGroups path=/organizations/{organizationId}/groups method=GET
    * @memberof Group
    */
    list(results: PagedResults<Group>, organizationId: string): Promise<void>;
}
export declare class GroupApiMappingImpl implements GroupApi {
    private producer;
    constructor(producer: GroupProducerApi);
    /**
     *
     * @summary Retrieves single access group details by group ID
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @openapi operation=getGroup path=/organizations/{organizationId}/groups/{groupId} method=GET
     */
    get(organizationId: string, groupId: string): Promise<GroupInfo>;
    /**
     *
     * @summary Retrieves all entries/permissions for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupEntries path=/organizations/{organizationId}/groups/{groupId}/entries method=GET
     */
    listEntries(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Entry>>;
    /**
     *
     * @summary Retrieves all users belonging to a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupUsers path=/organizations/{organizationId}/groups/{groupId}/users method=GET
     */
    listUsers(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<User>>;
    /**
     *
     * @summary Retrieves all zones and their associated configurations for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupZoneGroups path=/organizations/{organizationId}/groups/{groupId}/zoneGroups method=GET
     */
    listZoneGroups(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<GroupZoneGroup>>;
    /**
     *
     * @summary Retrieves all zones for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupZones path=/organizations/{organizationId}/groups/{groupId}/zones method=GET
     */
    listZones(organizationId: string, groupId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<GroupZone>>;
    /**
     *
     * @summary Retrieves all access groups in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroups path=/organizations/{organizationId}/groups method=GET
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Group>>;
}
export declare class GroupApiHubImpl implements GroupProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    get(organizationId: string, groupId: string): Promise<GroupInfo>;
    listEntries(results: PagedResults<Entry>, organizationId: string, groupId: string): Promise<void>;
    listUsers(results: PagedResults<User>, organizationId: string, groupId: string): Promise<void>;
    listZoneGroups(results: PagedResults<GroupZoneGroup>, organizationId: string, groupId: string): Promise<void>;
    listZones(results: PagedResults<GroupZone>, organizationId: string, groupId: string): Promise<void>;
    list(results: PagedResults<Group>, organizationId: string): Promise<void>;
}
