import { AxiosInstance } from 'axios';
import { AuditLogEntry } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace AuditApi {
}
/**
 * AuditApi - interface
 * @export
 * @interface AuditApi
 */
export interface AuditApi {
    /**
     *
     * @summary Retrieves audit logs for the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} [filter] Filter criteria for audit logs (e.g., &quot;timestamp:(1753282000--1753284000)&quot;)
     * @param {string} [options] Search options (e.g., &quot;searchId:123-456-0&quot;)
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listAuditLogs('organizationId', 'filter', 'options', 1, 1);
     * ```
     * @openapi operation=listAuditLogs path=/organizations/{organizationId}/reports/auditLogs/ui method=GET
     * @memberof AuditApi
     */
    listAuditLogs(organizationId: string, filter?: string, options?: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<AuditLogEntry>>;
}
/**
 * AuditProducerApi - interface
 * Producer interface for Audit
 * @export
 * @interface AuditProducerApi
 */
export interface AuditProducerApi {
    /**
    *
    * @summary Retrieves audit logs for the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} [filter] Filter criteria for audit logs (e.g., &quot;timestamp:(1753282000--1753284000)&quot;)
    * @param {string} [options] Search options (e.g., &quot;searchId:123-456-0&quot;)
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listAuditLogs path=/organizations/{organizationId}/reports/auditLogs/ui method=GET
    * @memberof Audit
    */
    listAuditLogs(results: PagedResults<AuditLogEntry>, organizationId: string, filter?: string, options?: string): Promise<void>;
}
export declare class AuditApiMappingImpl implements AuditApi {
    private producer;
    constructor(producer: AuditProducerApi);
    /**
     *
     * @summary Retrieves audit logs for the organization
     * @param organizationId Unique identifier for the organization
     * @param filter Filter criteria for audit logs (e.g., &quot;timestamp:(1753282000--1753284000)&quot;)
     * @param options Search options (e.g., &quot;searchId:123-456-0&quot;)
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listAuditLogs path=/organizations/{organizationId}/reports/auditLogs/ui method=GET
     */
    listAuditLogs(organizationId: string, filter?: string, options?: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<AuditLogEntry>>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapAuditProducer(producer: AuditProducerApi): AuditApi;
/**
 * AuditApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class AuditApiHttpImpl implements AuditProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    listAuditLogs(results: PagedResults<AuditLogEntry>, organizationId: string, filter?: string, options?: string): Promise<void>;
}
