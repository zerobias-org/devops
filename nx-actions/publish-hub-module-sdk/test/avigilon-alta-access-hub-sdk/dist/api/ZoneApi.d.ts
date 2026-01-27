import { AxiosInstance } from 'axios';
import { Zone, ZoneShare, ZoneZoneUser } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace ZoneApi {
}
/**
 * ZoneApi - interface
 * @export
 * @interface ZoneApi
 */
export interface ZoneApi {
    /**
     *
     * @summary Retrieves all zone shares for a specific zone
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} zoneId Unique identifier for a zone
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZoneShares('organizationId', 'zoneId', 1, 1);
     * ```
     * @openapi operation=listZoneShares path=/organizations/{organizationId}/zones/{zoneId}/zoneShares method=GET
     * @memberof ZoneApi
     */
    listZoneShares(organizationId: string, zoneId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ZoneShare>>;
    /**
     *
     * @summary Retrieves all zone users with their access configurations for a specific zone
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} zoneId Unique identifier for a zone
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listZoneUsers('organizationId', 'zoneId', 1, 1);
     * ```
     * @openapi operation=listZoneZoneUsers path=/organizations/{organizationId}/zones/{zoneId}/zoneUsers method=GET
     * @memberof ZoneApi
     */
    listZoneUsers(organizationId: string, zoneId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ZoneZoneUser>>;
    /**
     *
     * @summary Retrieves all zones in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.list('organizationId', 1, 1);
     * ```
     * @openapi operation=listZones path=/organizations/{organizationId}/zones method=GET
     * @memberof ZoneApi
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Zone>>;
}
/**
 * ZoneProducerApi - interface
 * Producer interface for Zone
 * @export
 * @interface ZoneProducerApi
 */
export interface ZoneProducerApi {
    /**
    *
    * @summary Retrieves all zone shares for a specific zone
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} zoneId Unique identifier for a zone
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listZoneShares path=/organizations/{organizationId}/zones/{zoneId}/zoneShares method=GET
    * @memberof Zone
    */
    listZoneShares(results: PagedResults<ZoneShare>, organizationId: string, zoneId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zone users with their access configurations for a specific zone
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} zoneId Unique identifier for a zone
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listZoneZoneUsers path=/organizations/{organizationId}/zones/{zoneId}/zoneUsers method=GET
    * @memberof Zone
    */
    listZoneUsers(results: PagedResults<ZoneZoneUser>, organizationId: string, zoneId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all zones in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listZones path=/organizations/{organizationId}/zones method=GET
    * @memberof Zone
    */
    list(results: PagedResults<Zone>, organizationId: string): Promise<void>;
}
export declare class ZoneApiMappingImpl implements ZoneApi {
    private producer;
    constructor(producer: ZoneProducerApi);
    /**
     *
     * @summary Retrieves all zone shares for a specific zone
     * @param organizationId Unique identifier for the organization
     * @param zoneId Unique identifier for a zone
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZoneShares path=/organizations/{organizationId}/zones/{zoneId}/zoneShares method=GET
     */
    listZoneShares(organizationId: string, zoneId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ZoneShare>>;
    /**
     *
     * @summary Retrieves all zone users with their access configurations for a specific zone
     * @param organizationId Unique identifier for the organization
     * @param zoneId Unique identifier for a zone
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZoneZoneUsers path=/organizations/{organizationId}/zones/{zoneId}/zoneUsers method=GET
     */
    listZoneUsers(organizationId: string, zoneId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<ZoneZoneUser>>;
    /**
     *
     * @summary Retrieves all zones in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZones path=/organizations/{organizationId}/zones method=GET
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Zone>>;
}
export declare class ZoneApiHubImpl implements ZoneProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    listZoneShares(results: PagedResults<ZoneShare>, organizationId: string, zoneId: string): Promise<void>;
    listZoneUsers(results: PagedResults<ZoneZoneUser>, organizationId: string, zoneId: string): Promise<void>;
    list(results: PagedResults<Zone>, organizationId: string): Promise<void>;
}
