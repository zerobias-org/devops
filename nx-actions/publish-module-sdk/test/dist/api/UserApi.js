import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class UserApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves single user details by user ID
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @openapi operation=getUser path=/organizations/{organizationId}/users/{userId} method=GET
     */
    async get(organizationId, userId) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
        }
        return this.producer.get(organizationId, userId);
    }
    /**
     *
     * @summary Retrieves all identities in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listOrgIdentities path=/organizations/{organizationId}/orgIdentities method=GET
     */
    async listOrgIdentities(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listOrgIdentities(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all organization pictures
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listOrgPictures path=/organizations/{organizationId}/orgPictures method=GET
     */
    async listOrgPictures(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listOrgPictures(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all users shared from other organizations
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listSharedUsers path=/organizations/{organizationId}/sharedUsers method=GET
     */
    async listSharedUsers(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listSharedUsers(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves activity report for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserActivity path=/organizations/{organizationId}/users/{userId}/activity method=GET
     */
    async listActivity(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listActivity(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all credentials for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserCredentials path=/organizations/{organizationId}/users/{userId}/credentials method=GET
     */
    async listCredentials(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listCredentials(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all entries/access permissions for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserEntries path=/organizations/{organizationId}/users/{userId}/entries method=GET
     */
    async listEntries(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listEntries(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all groups a specific user belongs to
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserGroups path=/organizations/{organizationId}/users/{userId}/groups method=GET
     */
    async listGroups(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listGroups(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all MFA credentials for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserMfaCredentials path=/organizations/{organizationId}/users/{userId}/mfaCredentials method=GET
     */
    async listMfaCredentials(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listMfaCredentials(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all pictures for a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserPictures path=/organizations/{organizationId}/users/{userId}/userPictures method=GET
     */
    async listPictures(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listPictures(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all roles assigned to a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserRoles path=/organizations/{organizationId}/users/{userId}/roles method=GET
     */
    async listRoles(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listRoles(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all sites associated with a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserSites path=/organizations/{organizationId}/users/{userId}/sites method=GET
     */
    async listSites(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listSites(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zones and their associated configurations a user has access to
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserZoneUsers path=/organizations/{organizationId}/users/{userId}/zoneUsers method=GET
     */
    async listZoneUsers(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listZoneUsers(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all zones associated with a specific user
     * @param organizationId Unique identifier for the organization
     * @param userId Unique identifier for a user
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUserZones path=/organizations/{organizationId}/users/{userId}/zones method=GET
     */
    async listZones(organizationId, userId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined || userId === '') {
            throw new ParameterRequiredError('userId');
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
        await this.producer.listZones(bag, organizationId, userId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all users in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listUsers path=/organizations/{organizationId}/users method=GET
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
export function wrapUserProducer(producer) {
    return new UserApiMappingImpl(producer);
}
/**
 * UserApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export class UserApiHttpImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async get(organizationId, userId) {
        const _queryParams = {};
        const _bodyParams = {};
        let _path = '/organizations/{organizationId}/users/{userId}';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
        return this.client.get(_path, { params: _queryParams })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            if (response.status >= 400) {
                throw CoreError.deserialize(response.data);
            }
            return ObjectSerializer.deserialize(response.data, 'UserInfo');
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
    async listOrgIdentities(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/orgIdentities';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<OrgIdentity>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/orgIdentities`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'OrgIdentity');
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
    async listOrgPictures(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/orgPictures';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<OrgPicture>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/orgPictures`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'OrgPicture');
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
    async listSharedUsers(results, organizationId) {
        const _body = {
            organizationId,
        };
        let _path = '/organizations/{organizationId}/sharedUsers';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<SharedUser>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/sharedUsers`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'SharedUser');
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
    async listActivity(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/activity';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserActivityEvent>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/activity`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserActivityEvent');
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
    async listCredentials(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/credentials';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserCredential>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/credentials`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserCredential');
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
    async listEntries(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/entries';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserEntry>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/entries`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserEntry');
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
    async listGroups(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/groups';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Group>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/groups`);
            results.httpMethod = HttpMethod.Get;
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
    async listMfaCredentials(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/mfaCredentials';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<MfaCredential>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/mfaCredentials`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'MfaCredential');
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
    async listPictures(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/userPictures';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserPicture>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/userPictures`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserPicture');
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
    async listRoles(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/roles';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Role>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/roles`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Role');
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
    async listSites(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/sites';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<Site>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/sites`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'Site');
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
    async listZoneUsers(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/zoneUsers';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserZoneUser>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/zoneUsers`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserZoneUser');
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
    async listZones(results, organizationId, userId) {
        const _body = {
            organizationId, userId,
        };
        let _path = '/organizations/{organizationId}/users/{userId}/zones';
        _path = _path.replace('{organizationId}', encodeURIComponent(String(organizationId)));
        _path = _path.replace('{userId}', encodeURIComponent(String(userId)));
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<UserZone>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users/{userId}/zones`);
            results.httpMethod = HttpMethod.Get;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'UserZone');
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
        let _path = '/organizations/{organizationId}/users';
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
            results.items = ObjectSerializer.deserialize(response.data, 'Array<User>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/organizations/{organizationId}/users`);
            results.httpMethod = HttpMethod.Get;
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
}
