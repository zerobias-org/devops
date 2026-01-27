import { AxiosInstance } from 'axios';
import { RoleInfo, RoleUser } from '../model/index.js';
import { PagedResults } from '@zerobias-org/types-core-js';
export declare namespace RoleApi {
}
/**
 * RoleApi - interface
 * @export
 * @interface RoleApi
 */
export interface RoleApi {
    /**
     *
     * @summary Retrieves all users assigned to a specific role
     * @param {string} organizationId Unique identifier for the organization
     * @param {string} roleId Unique identifier for a role
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listRoleUsers('organizationId', 'roleId', 1, 1);
     * ```
     * @openapi operation=listRoleUsers path=/organizations/{organizationId}/roles/{roleId}/users method=GET
     * @memberof RoleApi
     */
    listRoleUsers(organizationId: string, roleId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<RoleUser>>;
    /**
     *
     * @summary Retrieves all roles in the organization
     * @param {string} organizationId Unique identifier for the organization
     * @param {number} [pageNumber] The requested page. This value is 1-indexed.
     * @param {number} [pageSize] The number of items in each page of data.
     * @param {*} [options] Override http request option.
     * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
     * @example
     * ```typescript
     * const result = await api.listRoles('organizationId', 1, 1);
     * ```
     * @openapi operation=listRoles path=/organizations/{organizationId}/roles method=GET
     * @memberof RoleApi
     */
    listRoles(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<RoleInfo>>;
}
/**
 * RoleProducerApi - interface
 * Producer interface for Role
 * @export
 * @interface RoleProducerApi
 */
export interface RoleProducerApi {
    /**
    *
    * @summary Retrieves all users assigned to a specific role
    * @param {string} organizationId Unique identifier for the organization
    * @param {string} roleId Unique identifier for a role
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listRoleUsers path=/organizations/{organizationId}/roles/{roleId}/users method=GET
    * @memberof Role
    */
    listRoleUsers(results: PagedResults<RoleUser>, organizationId: string, roleId: string): Promise<void>;
    /**
    *
    * @summary Retrieves all roles in the organization
    * @param {string} organizationId Unique identifier for the organization
    * @param {*} [options] Override http request option.
    * @throws {@link @zerobias-org/types-core-js#ParameterRequiredError} if any required parameter is not provided
    * @openapi operation=listRoles path=/organizations/{organizationId}/roles method=GET
    * @memberof Role
    */
    listRoles(results: PagedResults<RoleInfo>, organizationId: string): Promise<void>;
}
export declare class RoleApiMappingImpl implements RoleApi {
    private producer;
    constructor(producer: RoleProducerApi);
    /**
     *
     * @summary Retrieves all users assigned to a specific role
     * @param organizationId Unique identifier for the organization
     * @param roleId Unique identifier for a role
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listRoleUsers path=/organizations/{organizationId}/roles/{roleId}/users method=GET
     */
    listRoleUsers(organizationId: string, roleId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<RoleUser>>;
    /**
     *
     * @summary Retrieves all roles in the organization
     * @param organizationId Unique identifier for the organization
     * @param pageNumber The requested page. This value is 1-indexed.
     * @param pageSize The number of items in each page of data.
     * @openapi operation=listRoles path=/organizations/{organizationId}/roles method=GET
     */
    listRoles(organizationId: string, pageNumber?: number, pageSize?: number): Promise<PagedResults<RoleInfo>>;
}
export declare class RoleApiHubImpl implements RoleProducerApi {
    private client;
    private headers;
    constructor(client: AxiosInstance, headers?: Record<string, string>);
    listRoleUsers(results: PagedResults<RoleUser>, organizationId: string, roleId: string): Promise<void>;
    listRoles(results: PagedResults<RoleInfo>, organizationId: string): Promise<void>;
}
