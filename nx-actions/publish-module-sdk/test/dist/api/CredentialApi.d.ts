import { AxiosInstance } from 'axios';
import { CardFormat, CredentialAction, CredentialActionType, CredentialType, OrgCredential } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace CredentialApi {
}
/**
 * CredentialApi - interface
 * @export
 * @interface CredentialApi
 */
export interface CredentialApi {
    /**
     *
     * @summary Retrieves all card formats in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCardFormats('organizationId', 1, 1);
     * ```
     * @openapi operation=listCardFormats path=/organizations/{organizationId}/cardFormats method=GET
     * @memberof CredentialApi
     */
    listCardFormats(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CardFormat>>;
    /**
     *
     * @summary Retrieves all credential action types in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCredentialActionTypes('organizationId', 1, 1);
     * ```
     * @openapi operation=listCredentialActionTypes path=/organizations/{organizationId}/credentialActionTypes method=GET
     * @memberof CredentialApi
     */
    listCredentialActionTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialActionType>>;
    /**
     *
     * @summary Retrieves all actions performed on a specific credential
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} credentialId Unique identifier for a credential
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCredentialActions('organizationId', 'credentialId', 1, 1);
     * ```
     * @openapi operation=listCredentialActions path=/organizations/{organizationId}/credentials/{credentialId}/credentialActions method=GET
     * @memberof CredentialApi
     */
    listCredentialActions(organizationId: string, credentialId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialAction>>;
    /**
     *
     * @summary Retrieves all credential types in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listCredentialTypes('organizationId', 1, 1);
     * ```
     * @openapi operation=listCredentialTypes path=/organizations/{organizationId}/credentialTypes method=GET
     * @memberof CredentialApi
     */
    listCredentialTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialType>>;
    /**
     *
     * @summary Retrieves all credentials in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listOrgCredentials('organizationId', 1, 1);
     * ```
     * @openapi operation=listOrgCredentials path=/organizations/{organizationId}/credentials method=GET
     * @memberof CredentialApi
     */
    listOrgCredentials(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgCredential>>;
}
/**
 * CredentialProducerApi - interface
 * Producer interface for Credential
 * @export
 * @interface CredentialProducerApi
 */
export interface CredentialProducerApi {
    /**
    *
    * @summary Retrieves all card formats in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listCardFormats path=/organizations/{organizationId}/cardFormats method=GET
    * @memberof Credential
    */
    listCardFormats(results: PagedResults<CardFormat>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all credential action types in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listCredentialActionTypes path=/organizations/{organizationId}/credentialActionTypes method=GET
    * @memberof Credential
    */
    listCredentialActionTypes(results: PagedResults<CredentialActionType>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all actions performed on a specific credential
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} credentialId Unique identifier for a credential
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listCredentialActions path=/organizations/{organizationId}/credentials/{credentialId}/credentialActions method=GET
    * @memberof Credential
    */
    listCredentialActions(results: PagedResults<CredentialAction>, organizationId: string, credentialId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all credential types in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listCredentialTypes path=/organizations/{organizationId}/credentialTypes method=GET
    * @memberof Credential
    */
    listCredentialTypes(results: PagedResults<CredentialType>, organizationId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all credentials in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listOrgCredentials path=/organizations/{organizationId}/credentials method=GET
    * @memberof Credential
    */
    listOrgCredentials(results: PagedResults<OrgCredential>, organizationId: string): Promise<void>;
}
export declare class CredentialApiMappingImpl implements CredentialApi {
    private producer;
    constructor(producer: CredentialProducerApi);
    /**
     *
     * @summary Retrieves all card formats in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listCardFormats path=/organizations/{organizationId}/cardFormats method=GET
     */
    listCardFormats(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CardFormat>>;
    /**
     *
     * @summary Retrieves all credential action types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listCredentialActionTypes path=/organizations/{organizationId}/credentialActionTypes method=GET
     */
    listCredentialActionTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialActionType>>;
    /**
     *
     * @summary Retrieves all actions performed on a specific credential
     * @param organizationId Unique identifier for the organization
     * @param credentialId Unique identifier for a credential
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listCredentialActions path=/organizations/{organizationId}/credentials/{credentialId}/credentialActions method=GET
     */
    listCredentialActions(organizationId: string, credentialId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialAction>>;
    /**
     *
     * @summary Retrieves all credential types in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listCredentialTypes path=/organizations/{organizationId}/credentialTypes method=GET
     */
    listCredentialTypes(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<CredentialType>>;
    /**
     *
     * @summary Retrieves all credentials in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listOrgCredentials path=/organizations/{organizationId}/credentials method=GET
     */
    listOrgCredentials(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<OrgCredential>>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapCredentialProducer(producer: CredentialProducerApi): CredentialApi;
/**
 * CredentialApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class CredentialApiHttpImpl implements CredentialProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    listCardFormats(results: PagedResults<CardFormat>, organizationId: string): Promise<void>;
    listCredentialActionTypes(results: PagedResults<CredentialActionType>, organizationId: string): Promise<void>;
    listCredentialActions(results: PagedResults<CredentialAction>, organizationId: string, credentialId: string): Promise<void>;
    listCredentialTypes(results: PagedResults<CredentialType>, organizationId: string): Promise<void>;
    listOrgCredentials(results: PagedResults<OrgCredential>, organizationId: string): Promise<void>;
}
