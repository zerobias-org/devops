import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class EntryApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves detailed information for a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @openapi operation=getEntry path=/organizations/{organizationId}/entries/{entryId} method=GET
     */
    async get(organizationId, entryId) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'entryId' is not null or undefined
        if (entryId === null || entryId === undefined || entryId === '') {
            throw new ParameterRequiredError('entryId');
        }
        return this.producer.get(organizationId, entryId);
    }
    /**
     *
     * @summary Retrieves all entries in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntries path=/organizations/{organizationId}/entries method=GET
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
    /**
     *
     * @summary Retrieves activity report for a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryActivity path=/organizations/{organizationId}/entries/{entryId}/activity method=GET
     */
    async listActivity(organizationId, entryId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'entryId' is not null or undefined
        if (entryId === null || entryId === undefined || entryId === '') {
            throw new ParameterRequiredError('entryId');
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
        await this.producer.listActivity(bag, organizationId, entryId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all cameras associated with a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryCameras path=/organizations/{organizationId}/entries/{entryId}/cameras method=GET
     */
    async listCameras(organizationId, entryId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'entryId' is not null or undefined
        if (entryId === null || entryId === undefined || entryId === '') {
            throw new ParameterRequiredError('entryId');
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
        await this.producer.listCameras(bag, organizationId, entryId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all entry states in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryStates path=/organizations/{organizationId}/entryStates method=GET
     */
    async listEntryStates(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listEntryStates(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all active users with their associated schedules that have access to a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryUserSchedules path=/organizations/{organizationId}/entries/{entryId}/userSchedules method=GET
     */
    async listUserSchedules(organizationId, entryId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'entryId' is not null or undefined
        if (entryId === null || entryId === undefined || entryId === '') {
            throw new ParameterRequiredError('entryId');
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
        await this.producer.listUserSchedules(bag, organizationId, entryId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all active users that have access to a specific entry
     * @param organizationId Unique identifier for the organization
     * @param entryId Unique identifier for an entry
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listEntryUsers path=/organizations/{organizationId}/entries/{entryId}/users method=GET
     */
    async listUsers(organizationId, entryId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'entryId' is not null or undefined
        if (entryId === null || entryId === undefined || entryId === '') {
            throw new ParameterRequiredError('entryId');
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
        await this.producer.listUsers(bag, organizationId, entryId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
export class EntryApiHubImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async get(organizationId, entryId) {
        const _body = {
            organizationId, entryId,
        };
        return this.client.put('/getEntry', {
            ..._body,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            return ObjectSerializer.deserialize(response.data, 'EntryInfo');
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
        return this.client.put('/listEntries', {
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
            results.baseUrl = new URL(`${this.client.getUri()}/listEntries`);
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
    async listActivity(results, organizationId, entryId) {
        const _body = {
            organizationId, entryId,
        };
        return this.client.put('/listEntryActivity', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<EntryActivityEvent>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listEntryActivity`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'EntryActivityEvent');
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
    async listCameras(results, organizationId, entryId) {
        const _body = {
            organizationId, entryId,
        };
        return this.client.put('/listEntryCameras', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<EntryCamera>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listEntryCameras`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'EntryCamera');
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
    async listEntryStates(results, organizationId) {
        const _body = {
            organizationId,
        };
        return this.client.put('/listEntryStates', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<EntryStateInfo>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listEntryStates`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'EntryStateInfo');
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
    async listUserSchedules(results, organizationId, entryId) {
        const _body = {
            organizationId, entryId,
        };
        return this.client.put('/listEntryUserSchedules', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<EntryUserSchedule>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listEntryUserSchedules`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'EntryUserSchedule');
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
    async listUsers(results, organizationId, entryId) {
        const _body = {
            organizationId, entryId,
        };
        return this.client.put('/listEntryUsers', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<EntryUser>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listEntryUsers`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'EntryUser');
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
