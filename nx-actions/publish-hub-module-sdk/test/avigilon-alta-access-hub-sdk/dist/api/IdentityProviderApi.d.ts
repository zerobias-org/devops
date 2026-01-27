import { AxiosInstance } from 'axios';
import { IdentityProvider, IdentityProviderGroup, IdentityProviderGroupRelation, IdentityProviderType, IdentityProviderTypeInfo } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace IdentityProviderApi {
}
/**
 * IdentityProviderApi - interface
 * @export
 * @interface IdentityProviderApi
 */
export interface IdentityProviderApi {
    /**
     *
     * @summary Retrieves group relations for a specific identity provider
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} identityProviderId Unique identifier for an identity provider
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.getIdentityProviderGroupRelations('organizationId', 'identityProviderId', 1, 1);
     * ```
     * @openapi operation=getIdentityProviderGroupRelations path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groupRelations method=GET
     * @memberof IdentityProviderApi
     */
    getIdentityProviderGroupRelations(organizationId: string, identityProviderId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderGroupRelation>>;
    /**
     *
     * @summary Retrieves detailed information for a specific identity provider type
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} identityProviderTypeId Unique identifier for an identity provider type
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.getIdentityProviderType('organizationId', 'identityProviderTypeId');
     * ```
     * @openapi operation=getIdentityProviderType path=/organizations/{organizationId}/identityProviderTypes/{identityProviderTypeId} method=GET
     * @memberof IdentityProviderApi
     */
    getIdentityProviderType(organizationId: string, identityProviderTypeId: string): Promise<IdentityProviderTypeInfo>;
    /**
     *
     * @summary Retrieves all groups from a specific identity provider
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} identityProviderId Unique identifier for an identity provider
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listIdentityProviderGroups('organizationId', 'identityProviderId', 1, 1);
     * ```
     * @openapi operation=listIdentityProviderGroups path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groups method=GET
     * @memberof IdentityProviderApi
     */
    listIdentityProviderGroups(organizationId: string, identityProviderId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderGroup>>;
    /**
     *
     * @summary Retrieves all identity provider types in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listIdentityProviderTypes('organizationId', 1, 1);
     * ```
     * @openapi operation=listIdentityProviderTypes path=/organizations/{organizationId}/identityProviderTypes method=GET
     * @memberof IdentityProviderApi
     */
    listIdentityProviderTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderType>>;
    /**
     *
     * @summary Retrieves all identity providers in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listIdentityProviders('organizationId', 1, 1);
     * ```
     * @openapi operation=listIdentityProviders path=/organizations/{organizationId}/identityProviders method=GET
     * @memberof IdentityProviderApi
     */
    listIdentityProviders(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProvider>>;
}
/**
 * IdentityProviderProducerApi - interface
 * Producer interface for IdentityProvider
 * @export
 * @interface IdentityProviderProducerApi
 */
export interface IdentityProviderProducerApi {
    /**
    *
    * @summary Retrieves group relations for a specific identity provider
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} identityProviderId Unique identifier for an identity provider
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getIdentityProviderGroupRelations path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groupRelations method=GET
    * @memberof IdentityProvider
    */
    getIdentityProviderGroupRelations(results: PagedResults<IdentityProviderGroupRelation>, organizationId: string, identityProviderId: string): Promise<void>;
    /**
    *
    * @summary Retrieves detailed information for a specific identity provider type
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} identityProviderTypeId Unique identifier for an identity provider type
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getIdentityProviderType path=/organizations/{organizationId}/identityProviderTypes/{identityProviderTypeId} method=GET
    * @memberof IdentityProvider
    */
    getIdentityProviderType(organizationId: string, identityProviderTypeId: string): Promise<IdentityProviderTypeInfo>;
    /**
    *
    * @summary Retrieves all groups from a specific identity provider
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} identityProviderId Unique identifier for an identity provider
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listIdentityProviderGroups path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groups method=GET
    * @memberof IdentityProvider
    */
    listIdentityProviderGroups(results: PagedResults<IdentityProviderGroup>, organizationId: string, identityProviderId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all identity provider types in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listIdentityProviderTypes path=/organizations/{organizationId}/identityProviderTypes method=GET
    * @memberof IdentityProvider
    */
    listIdentityProviderTypes(results: PagedResults<IdentityProviderType>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all identity providers in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listIdentityProviders path=/organizations/{organizationId}/identityProviders method=GET
    * @memberof IdentityProvider
    */
    listIdentityProviders(results: PagedResults<IdentityProvider>, organizationId: string): Promise<void>;
}
export declare class IdentityProviderApiMappingImpl implements IdentityProviderApi {
    private producer;
    constructor(producer: IdentityProviderProducerApi);
    /**
     *
     * @summary Retrieves group relations for a specific identity provider
     * @param organizationId Unique identifier for the organization
     * @param identityProviderId Unique identifier for an identity provider
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=getIdentityProviderGroupRelations path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groupRelations method=GET
     */
    getIdentityProviderGroupRelations(organizationId: string, identityProviderId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderGroupRelation>>;
    /**
     *
     * @summary Retrieves detailed information for a specific identity provider type
     * @param organizationId Unique identifier for the organization
     * @param identityProviderTypeId Unique identifier for an identity provider type
     * @openapi operation=getIdentityProviderType path=/organizations/{organizationId}/identityProviderTypes/{identityProviderTypeId} method=GET
     */
    getIdentityProviderType(organizationId: string, identityProviderTypeId: string): Promise<IdentityProviderTypeInfo>;
    /**
     *
     * @summary Retrieves all groups from a specific identity provider
     * @param organizationId Unique identifier for the organization
     * @param identityProviderId Unique identifier for an identity provider
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviderGroups path=/organizations/{organizationId}/identityProviders/{identityProviderId}/groups method=GET
     */
    listIdentityProviderGroups(organizationId: string, identityProviderId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderGroup>>;
    /**
     *
     * @summary Retrieves all identity provider types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviderTypes path=/organizations/{organizationId}/identityProviderTypes method=GET
     */
    listIdentityProviderTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProviderType>>;
    /**
     *
     * @summary Retrieves all identity providers in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listIdentityProviders path=/organizations/{organizationId}/identityProviders method=GET
     */
    listIdentityProviders(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<IdentityProvider>>;
}
export declare class IdentityProviderApiHubImpl implements IdentityProviderProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    getIdentityProviderGroupRelations(results: PagedResults<IdentityProviderGroupRelation>, organizationId: string, identityProviderId: string): Promise<void>;
    getIdentityProviderType(organizationId: string, identityProviderTypeId: string): Promise<IdentityProviderTypeInfo>;
    listIdentityProviderGroups(results: PagedResults<IdentityProviderGroup>, organizationId: string, identityProviderId: string): Promise<void>;
    listIdentityProviderTypes(results: PagedResults<IdentityProviderType>, organizationId: string): Promise<void>;
    listIdentityProviders(results: PagedResults<IdentityProvider>, organizationId: string): Promise<void>;
}
