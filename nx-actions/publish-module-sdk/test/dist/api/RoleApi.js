import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class RoleApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves all users assigned to a specific role
     * @param organizationId Unique identifier for the organization
     * @param roleId Unique identifier for a role
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listRoleUsers path=/organizations/{organizationId}/roles/{roleId}/users method=GET
     */
    async listRoleUsers(organizationId, roleId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'roleId' is not null or undefined
        if (roleId === null || roleId === undefined || roleId === '') {
            throw new ParameterRequiredError('roleId');
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
        await this.producer.listRoleUsers(bag, organizationId, roleId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all roles in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listRoles path=/organizations/{organizationId}/roles method=GET
     */
    async listRoles(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listRoles(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
/**
 * Wrap producer with mapping implementation
 */
export function wrapRoleProducer(producer) {
    return new RoleApiMappingImpl(producer);
}
/**
 * RoleApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export class RoleApiHttpImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async listRoleUsers(results, organizationId, roleId) {
        const _body = {
            organizationId, roleId,
        };
        let _path = '/organizations/{organizationId}/roles/{roleId}/users';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{roleId}', encodeURIComponent(String(roleId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<RoleUser>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/roles/{roleId}/users`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'RoleUser');
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
    async listRoles(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/roles';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<RoleInfo>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/roles`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'RoleInfo');
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
