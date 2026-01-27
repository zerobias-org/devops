import { AuditApi } from './AuditApi.js';
export * from './AuditApi.js';
import { AuthApi } from './AuthApi.js';
export * from './AuthApi.js';
import { CredentialApi } from './CredentialApi.js';
export * from './CredentialApi.js';
import { EntryApi } from './EntryApi.js';
export * from './EntryApi.js';
import { GroupApi } from './GroupApi.js';
export * from './GroupApi.js';
import { IdentityProviderApi } from './IdentityProviderApi.js';
export * from './IdentityProviderApi.js';
import { RoleApi } from './RoleApi.js';
export * from './RoleApi.js';
import { ScheduleApi } from './ScheduleApi.js';
export * from './ScheduleApi.js';
import { SiteApi } from './SiteApi.js';
export * from './SiteApi.js';
import { UserApi } from './UserApi.js';
export * from './UserApi.js';
import { ZoneApi } from './ZoneApi.js';
export * from './ZoneApi.js';
import { Semver } from '@zerobias-org/types-core-js';
export declare const VERSION: Semver;
import { ConnectionProfile } from '@zerobias-org/util-api-client-base';
export * from '../model/index.js';
export { ConnectionProfile } from '@zerobias-org/util-api-client-base';
/**
 * AvigilonAltaAccess API interface
 *
 * Defines the available API endpoints for this service.
 */
export interface AvigilonAltaAccess {
    getAuditApi(): AuditApi;
    getAuthApi(): AuthApi;
    getCredentialApi(): CredentialApi;
    getEntryApi(): EntryApi;
    getGroupApi(): GroupApi;
    getIdentityProviderApi(): IdentityProviderApi;
    getRoleApi(): RoleApi;
    getScheduleApi(): ScheduleApi;
    getSiteApi(): SiteApi;
    getUserApi(): UserApi;
    getZoneApi(): ZoneApi;
}
/**
 * AvigilonAltaAccess API Client
 *
 * Platform API client for direct HTTP access to the service.
 * Uses BaseApiClient for connection management, auth, and request pipeline.
 *
 * @example
 * ```typescript
 * const client = newAvigilonAltaAccess();
 * await client.connect({
 *   url: 'http://localhost:8080',
 *   apiKey: 'your-api-key',
 *   orgId: 'org-uuid'
 * });
 *
 * const result = await client.getSomeApi().someMethod();
 * ```
 */
/**
 * Base path for this SDK (from OpenAPI servers[0].url)
 * This path is appended to the connection profile URL when connecting
 */
export declare const BASE_PATH = "";
export declare class AvigilonAltaAccessClient implements AvigilonAltaAccess {
    private baseClient;
    private client;
    private headers;
    constructor();
    /**
     * Connect to the service with connection profile
     */
    connect(connectionProfile: ConnectionProfile): Promise<void>;
    /**
     * Disconnect from the service
     */
    disconnect(): Promise<void>;
    /**
     * Check if connected to the service
     */
    isConnected(): boolean;
    /**
     * Enable or disable request inspection
     *
     * When enabled, all HTTP requests and responses are captured and can be
     * accessed via getRequestInspector(). Useful for debugging and testing.
     *
     * @param enabled - True to enable inspection, false to disable
     */
    enableRequestInspection(enabled: boolean): void;
    /**
     * Get request inspector instance
     *
     * Returns the RequestInspector for accessing captured HTTP requests/responses.
     * Returns undefined if inspection is not enabled.
     *
     * @returns RequestInspector instance or undefined
     */
    getRequestInspector(): import("@zerobias-org/util-api-client-base").RequestInspector | undefined;
    getAuditApi(): AuditApi;
    getAuthApi(): AuthApi;
    getCredentialApi(): CredentialApi;
    getEntryApi(): EntryApi;
    getGroupApi(): GroupApi;
    getIdentityProviderApi(): IdentityProviderApi;
    getRoleApi(): RoleApi;
    getScheduleApi(): ScheduleApi;
    getSiteApi(): SiteApi;
    getUserApi(): UserApi;
    getZoneApi(): ZoneApi;
}
/**
 * Create a new AvigilonAltaAccess API client instance
 *
 * @example
 * ```typescript
 * import { newAvigilonAltaAccess } from 'sdk';
 *
 * const client = newAvigilonAltaAccess();
 * await client.connect({
 *   url: 'http://localhost:8080',
 *   apiKey: 'your-api-key',
 *   orgId: 'org-uuid'
 * });
 *
 * const result = await client.getSomeApi().someMethod();
 * ```
 */
export declare function newAvigilonAltaAccess(): AvigilonAltaAccessClient;
