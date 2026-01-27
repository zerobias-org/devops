import { AxiosInstance } from 'axios';
import { Schedule, ScheduleEvent, ScheduleType } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace ScheduleApi {
}
/**
 * ScheduleApi - interface
 * @export
 * @interface ScheduleApi
 */
export interface ScheduleApi {
    /**
     *
     * @summary Retrieves all events for a specific schedule
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} scheduleId Unique identifier for a schedule
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listScheduleEvents('organizationId', 'scheduleId', 1, 1);
     * ```
     * @openapi operation=listScheduleEvents path=/organizations/{organizationId}/schedules/{scheduleId}/events method=GET
     * @memberof ScheduleApi
     */
    listScheduleEvents(organizationId: string, scheduleId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ScheduleEvent>>;
    /**
     *
     * @summary Retrieves all schedule types in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listScheduleTypes('organizationId', 1, 1);
     * ```
     * @openapi operation=listScheduleTypes path=/organizations/{organizationId}/scheduleTypes method=GET
     * @memberof ScheduleApi
     */
    listScheduleTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ScheduleType>>;
    /**
     *
     * @summary Retrieves all schedules in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listSchedules('organizationId', 1, 1);
     * ```
     * @openapi operation=listSchedules path=/organizations/{organizationId}/schedules method=GET
     * @memberof ScheduleApi
     */
    listSchedules(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Schedule>>;
}
/**
 * ScheduleProducerApi - interface
 * Producer interface for Schedule
 * @export
 * @interface ScheduleProducerApi
 */
export interface ScheduleProducerApi {
    /**
    *
    * @summary Retrieves all events for a specific schedule
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} scheduleId Unique identifier for a schedule
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listScheduleEvents path=/organizations/{organizationId}/schedules/{scheduleId}/events method=GET
    * @memberof Schedule
    */
    listScheduleEvents(results: PagedResults<ScheduleEvent>, organizationId: string, scheduleId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all schedule types in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listScheduleTypes path=/organizations/{organizationId}/scheduleTypes method=GET
    * @memberof Schedule
    */
    listScheduleTypes(results: PagedResults<ScheduleType>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all schedules in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listSchedules path=/organizations/{organizationId}/schedules method=GET
    * @memberof Schedule
    */
    listSchedules(results: PagedResults<Schedule>, organizationId: string): Promise<void>;
}
export declare class ScheduleApiMappingImpl implements ScheduleApi {
    private producer;
    constructor(producer: ScheduleProducerApi);
    /**
     *
     * @summary Retrieves all events for a specific schedule
     * @param organizationId Unique identifier for the organization
     * @param scheduleId Unique identifier for a schedule
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listScheduleEvents path=/organizations/{organizationId}/schedules/{scheduleId}/events method=GET
     */
    listScheduleEvents(organizationId: string, scheduleId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ScheduleEvent>>;
    /**
     *
     * @summary Retrieves all schedule types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listScheduleTypes path=/organizations/{organizationId}/scheduleTypes method=GET
     */
    listScheduleTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ScheduleType>>;
    /**
     *
     * @summary Retrieves all schedules in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listSchedules path=/organizations/{organizationId}/schedules method=GET
     */
    listSchedules(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Schedule>>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapScheduleProducer(producer: ScheduleProducerApi): ScheduleApi;
/**
 * ScheduleApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class ScheduleApiHttpImpl implements ScheduleProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    listScheduleEvents(results: PagedResults<ScheduleEvent>, organizationId: string, scheduleId: string): Promise<void>;
    listScheduleTypes(results: PagedResults<ScheduleType>, organizationId: string): Promise<void>;
    listSchedules(results: PagedResults<Schedule>, organizationId: string): Promise<void>;
}
