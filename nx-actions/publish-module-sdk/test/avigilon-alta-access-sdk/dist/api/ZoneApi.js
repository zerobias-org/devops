import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class ZoneApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves all zone shares for a specific zone
     * @param organizationId Unique identifier for the organization
     * @param zoneId Unique identifier for a zone
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZoneShares path=/organizations/{organizationId}/zones/{zoneId}/zoneShares method=GET
     */
    async listZoneShares(organizationId, zoneId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'zoneId' is not null or undefined
        if (zoneId === null || zoneId === undefined || zoneId === '') {
            throw new ParameterRequiredError('zoneId');
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
        await this.producer.listZoneShares(bag, organizationId, zoneId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zone users with their access configurations for a specific zone
     * @param organizationId Unique identifier for the organization
     * @param zoneId Unique identifier for a zone
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZoneZoneUsers path=/organizations/{organizationId}/zones/{zoneId}/zoneUsers method=GET
     */
    async listZoneUsers(organizationId, zoneId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'zoneId' is not null or undefined
        if (zoneId === null || zoneId === undefined || zoneId === '') {
            throw new ParameterRequiredError('zoneId');
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
        await this.producer.listZoneUsers(bag, organizationId, zoneId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zones in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listZones path=/organizations/{organizationId}/zones method=GET
     */
    async list(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.list(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
/**
 * Wrap producer with mapping implementation
 */
export function wrapZoneProducer(producer) {
    return new ZoneApiMappingImpl(producer);
}
/**
 * ZoneApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export class ZoneApiHttpImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async listZoneShares(results, organizationId, zoneId) {
        const _body = {
            organizationId, zoneId,
        };
        let _path = '/organizations/{organizationId}/zones/{zoneId}/zoneShares';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{zoneId}', encodeURIComponent(String(zoneId)));
        return this.client.get(_path, {
            params: {
                ..._body,
                pageNumber: results.pageNumber,
                pageSize: results.pageSize,
            }
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            if (response.status >= 400) {
                throw CoreError.deserialize(response.data);
            }
            results.items = ObjectSerializer.deserialize(response.data, 'Array<ZoneShare>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/zones/{zoneId}/zoneShares`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'ZoneShare');
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
    async listZoneUsers(results, organizationId, zoneId) {
        const _body = {
            organizationId, zoneId,
        };
        let _path = '/organizations/{organizationId}/zones/{zoneId}/zoneUsers';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{zoneId}', encodeURIComponent(String(zoneId)));
        return this.client.get(_path, {
            params: {
                ..._body,
                pageNumber: results.pageNumber,
                pageSize: results.pageSize,
            }
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            if (response.status >= 400) {
                throw CoreError.deserialize(response.data);
            }
            results.items = ObjectSerializer.deserialize(response.data, 'Array<ZoneZoneUser>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/zones/{zoneId}/zoneUsers`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'ZoneZoneUser');
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
    async list(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/zones';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        return this.client.get(_path, {
            params: {
                ..._body,
                pageNumber: results.pageNumber,
                pageSize: results.pageSize,
            }
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            if (response.status >= 400) {
                throw CoreError.deserialize(response.data);
            }
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Zone>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/zones`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Zone');
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
