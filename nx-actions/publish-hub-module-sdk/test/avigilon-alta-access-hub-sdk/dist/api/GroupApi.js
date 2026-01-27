import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class GroupApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves single access group details by group ID
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @openapi operation=getGroup path=/organizations/{organizationId}/groups/{groupId} method=GET
     */
    async get(organizationId, groupId) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'groupId' is not null or undefined
        if (groupId === null || groupId === undefined || groupId === '') {
            throw new ParameterRequiredError('groupId');
        }
        return this.producer.get(organizationId, groupId);
    }
    /**
     *
     * @summary Retrieves all entries/permissions for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupEntries path=/organizations/{organizationId}/groups/{groupId}/entries method=GET
     */
    async listEntries(organizationId, groupId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'groupId' is not null or undefined
        if (groupId === null || groupId === undefined || groupId === '') {
            throw new ParameterRequiredError('groupId');
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
        await this.producer.listEntries(bag, organizationId, groupId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all users belonging to a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupUsers path=/organizations/{organizationId}/groups/{groupId}/users method=GET
     */
    async listUsers(organizationId, groupId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'groupId' is not null or undefined
        if (groupId === null || groupId === undefined || groupId === '') {
            throw new ParameterRequiredError('groupId');
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
        await this.producer.listUsers(bag, organizationId, groupId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zones and their associated configurations for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupZoneGroups path=/organizations/{organizationId}/groups/{groupId}/zoneGroups method=GET
     */
    async listZoneGroups(organizationId, groupId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'groupId' is not null or undefined
        if (groupId === null || groupId === undefined || groupId === '') {
            throw new ParameterRequiredError('groupId');
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
        await this.producer.listZoneGroups(bag, organizationId, groupId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zones for a specific group
     * @param organizationId Unique identifier for the organization
     * @param groupId Unique identifier for a group
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroupZones path=/organizations/{organizationId}/groups/{groupId}/zones method=GET
     */
    async listZones(organizationId, groupId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'groupId' is not null or undefined
        if (groupId === null || groupId === undefined || groupId === '') {
            throw new ParameterRequiredError('groupId');
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
        await this.producer.listZones(bag, organizationId, groupId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all access groups in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listGroups path=/organizations/{organizationId}/groups method=GET
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
export class GroupApiHubImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async get(organizationId, groupId) {
        const _body = {
            organizationId, groupId,
        };
        return this.client.put('/getGroup', {
            ..._body,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            return ObjectSerializer.deserialize(response.data, 'GroupInfo');
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
    async listEntries(results, organizationId, groupId) {
        const _body = {
            organizationId, groupId,
        };
        return this.client.put('/listGroupEntries', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Entry>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listGroupEntries`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Entry');
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
    async listUsers(results, organizationId, groupId) {
        const _body = {
            organizationId, groupId,
        };
        return this.client.put('/listGroupUsers', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<User>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listGroupUsers`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'User');
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
    async listZoneGroups(results, organizationId, groupId) {
        const _body = {
            organizationId, groupId,
        };
        return this.client.put('/listGroupZoneGroups', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<GroupZoneGroup>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listGroupZoneGroups`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'GroupZoneGroup');
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
    async listZones(results, organizationId, groupId) {
        const _body = {
            organizationId, groupId,
        };
        return this.client.put('/listGroupZones', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<GroupZone>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listGroupZones`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'GroupZone');
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
        return this.client.put('/listGroups', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Group>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listGroups`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Group');
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
