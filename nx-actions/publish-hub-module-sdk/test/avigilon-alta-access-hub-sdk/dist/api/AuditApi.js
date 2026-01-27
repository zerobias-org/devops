import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class AuditApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves audit logs for the organization
     * @param organizationId Unique identifier for the organization
     * @param filter Filter criteria for audit logs (e.g., \&quot;timestamp:(1753282000--1753284000)\&quot;)
     * @param options Search options (e.g., \&quot;searchId:123-456-0\&quot;)
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listAuditLogs path=/organizations/{organizationId}/reports/auditLogs/ui method=GET
     */
    async listAuditLogs(organizationId, filter, options, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        if (pageNumber) {
            await Int32.parse(pageNumber);
        }
        if (pageSize) {
            await Int32.parse(pageSize);
        }
        const bag = new PagedResults();
        bag.pageNumber = pageNumber;
        bag.pageSize = pageSize;
        await this.producer.listAuditLogs(bag, organizationId, filter, options);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
export class AuditApiHubImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async listAuditLogs(results, organizationId, filter, options) {
        const _body = {
            organizationId, filter, options,
        };
        return this.client.put('/listAuditLogs', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<AuditLogEntry>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listAuditLogs`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'AuditLogEntry');
        })
            .catch((error) => {
            if (error.data) {
                throw CoreError.deserialize(error.data);
            }
            else {
                throw error;
            }
        });
    }
}
