import { URL, PagedResults, Int32, CoreError, ParameterRequiredError, UnexpectedError, HttpMethod } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class IdentityProviderApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves group relations for a specific identity provider
     * @param organizationId Unique identifier for the organization
     * @param identityProviderId Unique identifier for an identity provider
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=getIdentityProviderGroupRelations path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groupRelations method=GET
     */
    async getIdentityProviderGroupRelations(organizationId, identityProviderId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'identityProviderId' is not null or undefined
        if (identityProviderId === null || identityProviderId === undefined || identityProviderId === '') {
            throw new ParameterRequiredError('identityProviderId');
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
        await this.producer.getIdentityProviderGroupRelations(bag, organizationId, identityProviderId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves detailed information for a specific identity provider type
     * @param organizationId Unique identifier for the organization
     * @param identityProviderTypeId Unique identifier for an identity provider type
     * @openapi operation=getIdentityProviderType path=/organizations/{organizationId}/identityProviderTypes/{identityProviderTypeId} method=GET
     */
    async getIdentityProviderType(organizationId, identityProviderTypeId) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'identityProviderTypeId' is not null or undefined
        if (identityProviderTypeId === null || identityProviderTypeId === undefined || identityProviderTypeId === '') {
            throw new ParameterRequiredError('identityProviderTypeId');
        }
        return this.producer.getIdentityProviderType(organizationId, identityProviderTypeId);
    }
    /**
     *
     * @summary Retrieves all groups from a specific identity provider
     * @param organizationId Unique identifier for the organization
     * @param identityProviderId Unique identifier for an identity provider
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviderGroups path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groups method=GET
     */
    async listIdentityProviderGroups(organizationId, identityProviderId, pageNumber = 1, pageSize = 50) {
        // verify required parameter 'organizationId' is not null or undefined
        if (organizationId === null || organizationId === undefined || organizationId === '') {
            throw new ParameterRequiredError('organizationId');
        }
        // verify required parameter 'identityProviderId' is not null or undefined
        if (identityProviderId === null || identityProviderId === undefined || identityProviderId === '') {
            throw new ParameterRequiredError('identityProviderId');
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
        await this.producer.listIdentityProviderGroups(bag, organizationId, identityProviderId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all identity provider types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviderTypes path=/organizations/{organizationId}/identityProviderTypes method=GET
     */
    async listIdentityProviderTypes(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listIdentityProviderTypes(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
    /**
     *
     * @summary Retrieves all identity providers in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviders path=/organizations/{organizationId}/identityProviders method=GET
     */
    async listIdentityProviders(organizationId, pageNumber = 1, pageSize = 50) {
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
        await this.producer.listIdentityProviders(bag, organizationId);
        if (bag.items === null || bag.items === undefined) {
            throw new UnexpectedError("Producers must return 'items' for PagedResults queries");
        }
        return bag;
    }
}
export class IdentityProviderApiHubImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async getIdentityProviderGroupRelations(results, organizationId, identityProviderId) {
        const _body = {
            organizationId, identityProviderId,
        };
        return this.client.put('/getIdentityProviderGroupRelations', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<IdentityProviderGroupRelation>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/getIdentityProviderGroupRelations`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'IdentityProviderGroupRelation');
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
    async getIdentityProviderType(organizationId, identityProviderTypeId) {
        const _body = {
            organizationId, identityProviderTypeId,
        };
        return this.client.put('/getIdentityProviderType', {
            ..._body,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            return ObjectSerializer.deserialize(response.data, 'IdentityProviderTypeInfo');
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
    async listIdentityProviderGroups(results, organizationId, identityProviderId) {
        const _body = {
            organizationId, identityProviderId,
        };
        return this.client.put('/listIdentityProviderGroups', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<IdentityProviderGroup>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listIdentityProviderGroups`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'IdentityProviderGroup');
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
    async listIdentityProviderTypes(results, organizationId) {
        const _body = {
            organizationId,
        };
        return this.client.put('/listIdentityProviderTypes', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<IdentityProviderType>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listIdentityProviderTypes`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'IdentityProviderType');
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
    async listIdentityProviders(results, organizationId) {
        const _body = {
            organizationId,
        };
        return this.client.put('/listIdentityProviders', {
            ..._body,
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            results.items = ObjectSerializer.deserialize(response.data, 'Array<IdentityProvider>');
            results.count = response.headers.count ? Number(response.headers.count) : -1;
            results.pageToken = response.headers.pagetoken ?? response.headers.pageToken;
            results.headers = this.headers;
            results.baseUrl = new URL(`${this.client.getUri()}/listIdentityProviders`);
            results.httpMethod = HttpMethod.Put;
            results.body = _body;
            results.mapper = (obj) => ObjectSerializer.deserialize(obj, 'IdentityProvider');
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
