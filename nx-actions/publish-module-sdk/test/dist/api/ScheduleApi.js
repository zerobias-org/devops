import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class ScheduleApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves all events for a specific schedule
     * @param organizationId Unique identifier for the organization
     * @param scheduleId Unique identifier for a schedule
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listScheduleEvents path=/organizations/{organizationId}/schedules/{scheduleId}/events method=GET
     */
    async listScheduleEvents(organizationId, scheduleId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'scheduleId' is not null or undefined
        if (scheduleId === null || scheduleId === undefined || scheduleId === '') {
            throw new ParameterRequiredError('scheduleId');
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
        await this.producer.listScheduleEvents(bag, organizationId, scheduleId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all schedule types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listScheduleTypes path=/organizations/{organizationId}/scheduleTypes method=GET
     */
    async listScheduleTypes(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listScheduleTypes(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all schedules in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listSchedules path=/organizations/{organizationId}/schedules method=GET
     */
    async listSchedules(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listSchedules(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
/**
 * Wrap producer with mapping implementation
 */
export function wrapScheduleProducer(producer) {
    return new ScheduleApiMappingImpl(producer);
}
/**
 * ScheduleApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export class ScheduleApiHttpImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async listScheduleEvents(results, organizationId, scheduleId) {
        const _body = {
            organizationId, scheduleId,
        };
        let _path = '/organizations/{organizationId}/schedules/{scheduleId}/events';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{scheduleId}', encodeURIComponent(String(scheduleId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<ScheduleEvent>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/schedules/{scheduleId}/events`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'ScheduleEvent');
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
    async listScheduleTypes(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/scheduleTypes';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<ScheduleType>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/scheduleTypes`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'ScheduleType');
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
    async listSchedules(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/schedules';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Schedule>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/schedules`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Schedule');
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
