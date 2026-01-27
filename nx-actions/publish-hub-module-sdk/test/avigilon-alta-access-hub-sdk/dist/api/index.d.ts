import { AuditApi, AuditProducerApi } from './AuditApi.js';
export declare function wrapAuditProducer(producer: AuditProducerApi): AuditApi;
export * from './AuditApi.js';
import { AuthApi, AuthProducerApi } from './AuthApi.js';
export declare function wrapAuthProducer(producer: AuthProducerApi): AuthApi;
export * from './AuthApi.js';
import { CredentialApi, CredentialProducerApi } from './CredentialApi.js';
export declare function wrapCredentialProducer(producer: CredentialProducerApi): CredentialApi;
export * from './CredentialApi.js';
import { EntryApi, EntryProducerApi } from './EntryApi.js';
export declare function wrapEntryProducer(producer: EntryProducerApi): EntryApi;
export * from './EntryApi.js';
import { GroupApi, GroupProducerApi } from './GroupApi.js';
export declare function wrapGroupProducer(producer: GroupProducerApi): GroupApi;
export * from './GroupApi.js';
import { IdentityProviderApi, IdentityProviderProducerApi } from './IdentityProviderApi.js';
export declare function wrapIdentityProviderProducer(producer: IdentityProviderProducerApi): IdentityProviderApi;
export * from './IdentityProviderApi.js';
import { RoleApi, RoleProducerApi } from './RoleApi.js';
export declare function wrapRoleProducer(producer: RoleProducerApi): RoleApi;
export * from './RoleApi.js';
import { ScheduleApi, ScheduleProducerApi } from './ScheduleApi.js';
export declare function wrapScheduleProducer(producer: ScheduleProducerApi): ScheduleApi;
export * from './ScheduleApi.js';
import { SiteApi, SiteProducerApi } from './SiteApi.js';
export declare function wrapSiteProducer(producer: SiteProducerApi): SiteApi;
export * from './SiteApi.js';
import { UserApi, UserProducerApi } from './UserApi.js';
export declare function wrapUserProducer(producer: UserProducerApi): UserApi;
export * from './UserApi.js';
import { ZoneApi, ZoneProducerApi } from './ZoneApi.js';
export declare function wrapZoneProducer(producer: ZoneProducerApi): ZoneApi;
export * from './ZoneApi.js';
import { Semver } from '@zerobias-org/types-core-js';
export declare const VERSION: Semver;
import { Connector } from '@zerobias-org/util-connector';
import { ConnectionProfile } from '../model/ConnectionProfile.js';
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
export declare class ConnectionWrapper {
    connectionProfile?: ConnectionProfile;
    constructor(connectionProfile?: ConnectionProfile);
}
export type AvigilonAltaAccessConnector = AvigilonAltaAccess & Connector<ConnectionProfile, void>;
import { HubConnector as HubCoreHubConnector } from '@zerobias-org/util-connector';
export declare class AvigilonAltaAccessHubImpl extends HubCoreHubConnector implements AvigilonAltaAccess {
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
