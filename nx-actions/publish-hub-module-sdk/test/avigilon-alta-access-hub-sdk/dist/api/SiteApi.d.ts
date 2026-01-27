import { AxiosInstance } from 'axios';
import { Site } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace SiteApi {
}
/**
 * SiteApi - interface
 * @export
 * @interface SiteApi
 */
export interface SiteApi {
    /**
     *
     * @summary Retrieves all sites in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.list('organizationId', 1, 1);
     * ```
     * @openapi operation=listSites path=/organizations/{organizationId}/sites method=GET
     * @memberof SiteApi
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Site>>;
}
/**
 * SiteProducerApi - interface
 * Producer interface for Site
 * @export
 * @interface SiteProducerApi
 */
export interface SiteProducerApi {
    /**
    *
    * @summary Retrieves all sites in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listSites path=/organizations/{organizationId}/sites method=GET
    * @memberof Site
    */
    list(results: PagedResults<Site>, organizationId: string): Promise<void>;
}
export declare class SiteApiMappingImpl implements SiteApi {
    private producer;
    constructor(producer: SiteProducerApi);
    /**
     *
     * @summary Retrieves all sites in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listSites path=/organizations/{organizationId}/sites method=GET
     */
    list(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<Site>>;
}
export declare class SiteApiHubImpl implements SiteProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    list(results: PagedResults<Site>, organizationId: string): Promise<void>;
}
