import { AxiosInstance } from 'axios';
import { Entry, EntryActivityEvent, EntryCamera, EntryInfo, EntryStateInfo, EntryUser, EntryUserSchedule } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace EntryApi {
}
/**
 * EntryApi - interface
 * @export
 * @interface EntryApi
 */
export interface EntryApi {
    /**
     *
     * @summary Retrieves detailed information for a specific entry
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} entryId Unique identifier for an entry
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.get('organizationId', 'entryId');
     * ```
     * @openapi operation=getEntry path=/organizations/{organizationId}/entries/{entryId} method=GET
     * @memberof EntryApi
     */
    get(organizationId: string, entryId: string): Promise<EntryInfo>;
    /**
     *
     * @summary Retrieves all entries in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.list('organizationId', 1, 1);
     * ```
     * @openapi operation=listEntries path=/organizations/{organizationId}/entries method=GET
     * @memberof EntryApi
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Entry>>;
    /**
     *
     * @summary Retrieves activity report for a specific entry
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} entryId Unique identifier for an entry
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listActivity('organizationId', 'entryId', 1, 1);
     * ```
     * @openapi operation=listEntryActivity path=/organizations/{organizationId}/entries/{entryId}/activity method=GET
     * @memberof EntryApi
     */
    listActivity(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryActivityEvent>>;
    /**
     *
     * @summary Retrieves all cameras associated with a specific entry
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} entryId Unique identifier for an entry
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCameras('organizationId', 'entryId', 1, 1);
     * ```
     * @openapi operation=listEntryCameras path=/organizations/{organizationId}/entries/{entryId}/cameras method=GET
     * @memberof EntryApi
     */
    listCameras(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryCamera>>;
    /**
     *
     * @summary Retrieves all entry states in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listEntryStates('organizationId', 1, 1);
     * ```
     * @openapi operation=listEntryStates path=/organizations/{organizationId}/entryStates method=GET
     * @memberof EntryApi
     */
    listEntryStates(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryStateInfo>>;
    /**
     *
     * @summary Retrieves all active users with their associated schedules that have access to a specific entry
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} entryId Unique identifier for an entry
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listUserSchedules('organizationId', 'entryId', 1, 1);
     * ```
     * @openapi operation=listEntryUserSchedules path=/organizations/{organizationId}/entries/{entryId}/userSchedules method=GET
     * @memberof EntryApi
     */
    listUserSchedules(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryUserSchedule>>;
    /**
     *
     * @summary Retrieves all active users that have access to a specific entry
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} entryId Unique identifier for an entry
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listUsers('organizationId', 'entryId', 1, 1);
     * ```
     * @openapi operation=listEntryUsers path=/organizations/{organizationId}/entries/{entryId}/users method=GET
     * @memberof EntryApi
     */
    listUsers(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryUser>>;
}
/**
 * EntryProducerApi - interface
 * Producer interface for Entry
 * @export
 * @interface EntryProducerApi
 */
export interface EntryProducerApi {
    /**
    *
    * @summary Retrieves detailed information for a specific entry
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} entryId Unique identifier for an entry
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getEntry path=/organizations/{organizationId}/entries/{entryId} method=GET
    * @memberof Entry
    */
    get(organizationId: string, entryId: string): Promise<EntryInfo>;
    /**
    *
    * @summary Retrieves all entries in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntries path=/organizations/{organizationId}/entries method=GET
    * @memberof Entry
    */
    list(results: PagedResults<Entry>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves activity report for a specific entry
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} entryId Unique identifier for an entry
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntryActivity path=/organizations/{organizationId}/entries/{entryId}/activity method=GET
    * @memberof Entry
    */
    listActivity(results: PagedResults<EntryActivityEvent>, organizationId: string, entryId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all cameras associated with a specific entry
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} entryId Unique identifier for an entry
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntryCameras path=/organizations/{organizationId}/entries/{entryId}/cameras method=GET
    * @memberof Entry
    */
    listCameras(results: PagedResults<EntryCamera>, organizationId: string, entryId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all entry states in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntryStates path=/organizations/{organizationId}/entryStates method=GET
    * @memberof Entry
    */
    listEntryStates(results: PagedResults<EntryStateInfo>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all active users with their associated schedules that have access to a specific entry
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} entryId Unique identifier for an entry
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntryUserSchedules path=/organizations/{organizationId}/entries/{entryId}/userSchedules method=GET
    * @memberof Entry
    */
    listUserSchedules(results: PagedResults<EntryUserSchedule>, organizationId: string, entryId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all active users that have access to a specific entry
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} entryId Unique identifier for an entry
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listEntryUsers path=/organizations/{organizationId}/entries/{entryId}/users method=GET
    * @memberof Entry
    */
    listUsers(results: PagedResults<EntryUser>, organizationId: string, entryId: string): Promise<void>;
}
export declare class EntryApiMappingImpl implements EntryApi {
    private producer;
    constructor(producer: EntryProducerApi);
    /**
     *
     * @summary Retrieves detailed information for a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @openapi operation=getEntry path=/organizations/{organizationId}/entries/{entryId} method=GET
     */
    get(organizationId: string, entryId: string): Promise<EntryInfo>;
    /**
     *
     * @summary Retrieves all entries in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntries path=/organizations/{organizationId}/entries method=GET
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Entry>>;
    /**
     *
     * @summary Retrieves activity report for a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryActivity path=/organizations/{organizationId}/entries/{entryId}/activity method=GET
     */
    listActivity(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryActivityEvent>>;
    /**
     *
     * @summary Retrieves all cameras associated with a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryCameras path=/organizations/{organizationId}/entries/{entryId}/cameras method=GET
     */
    listCameras(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryCamera>>;
    /**
     *
     * @summary Retrieves all entry states in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryStates path=/organizations/{organizationId}/entryStates method=GET
     */
    listEntryStates(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryStateInfo>>;
    /**
     *
     * @summary Retrieves all active users with their associated schedules that have access to a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryUserSchedules path=/organizations/{organizationId}/entries/{entryId}/userSchedules method=GET
     */
    listUserSchedules(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryUserSchedule>>;
    /**
     *
     * @summary Retrieves all active users that have access to a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryUsers path=/organizations/{organizationId}/entries/{entryId}/users method=GET
     */
    listUsers(organizationId: string, entryId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<EntryUser>>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapEntryProducer(producer: EntryProducerApi): EntryApi;
/**
 * EntryApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class EntryApiHttpImpl implements EntryProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    get(organizationId: string, entryId: string): Promise<EntryInfo>;
    list(results: PagedResults<Entry>, organizationId: string): Promise<void>;
    listActivity(results: PagedResults<EntryActivityEvent>, organizationId: string, entryId: string): Promise<void>;
    listCameras(results: PagedResults<EntryCamera>, organizationId: string, entryId: string): Promise<void>;
    listEntryStates(results: PagedResults<EntryStateInfo>, organizationId: string): Promise<void>;
    listUserSchedules(results: PagedResults<EntryUserSchedule>, organizationId: string, entryId: string): Promise<void>;
    listUsers(results: PagedResults<EntryUser>, organizationId: string, entryId: string): Promise<void>;
}
