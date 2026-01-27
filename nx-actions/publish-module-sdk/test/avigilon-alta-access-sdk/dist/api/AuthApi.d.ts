import { AxiosInstance } from 'axios';
import { TokenProperties } from '../model/index.js';
export declare namespace AuthApi {
}
/**
 * AuthApi - interface
 * @export
 * @interface AuthApi
 */
export interface AuthApi {
    /**
     *
     * @summary Retrieves properties and metadata for the current access token
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @openapi operation=getTokenProperties path=/accessToken method=GET
     * @memberof AuthApi
     */
    getTokenProperties(): Promise<TokenProperties>;
}
/**
 * AuthProducerApi - interface
 * Producer interface for Auth
 * @export
 * @interface AuthProducerApi
 */
export interface AuthProducerApi {
    /**
    *
    * @summary Retrieves properties and metadata for the current access token
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=getTokenProperties path=/accessToken method=GET
    * @memberof Auth
    */
    getTokenProperties(): Promise<TokenProperties>;
}
export declare class AuthApiMappingImpl implements AuthApi {
    private producer;
    constructor(producer: AuthProducerApi);
    /**
     *
     * @summary Retrieves properties and metadata for the current access token
     * @openapi operation=getTokenProperties path=/accessToken method=GET
     */
    getTokenProperties(): Promise<TokenProperties>;
}
/**
 * Wrap producer with mapping implementation
 */
export declare function wrapAuthProducer(producer: AuthProducerApi): AuthApi;
/**
 * AuthApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export declare class AuthApiHttpImpl implements AuthProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    getTokenProperties(): Promise<TokenProperties>;
}
