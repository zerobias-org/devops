# AvigilonAltaAccess Module Usage Guide

This module provides AvigilonAltaAccess operations through the ZeroBias Hub platform.

## Overview

The AvigilonAltaAccess module is a Hub Module that executes on Hub Nodes. It can be consumed in multiple ways:
- **Browser/Web Apps** - Use the SDK to invoke operations remotely (cookies handle auth)
- **Collector Bots** - Automated data collection within the platform
- **Direct Import** - Run in Node.js environments with direct access

## Installation

```bash
npm install module-client-ts
```

## Usage in Browser Applications

Browser applications authenticate via cookies (Dana session) and require a scope ID:

```typescript
import { AvigilonAltaAccessClient, newAvigilonAltaAccess } from 'module-client-ts';
import { getZerobiasClientUrl } from '@auditmation/zb-client-lib-js';

// Get scope ID from your connection/scope selection UI
const scopeId = 'uuid-of-selected-scope';

// Create client
const client = newAvigilonAltaAccess();

// Connect using scope ID
const hubConnectionProfile = {
  server: getZerobiasClientUrl('hub', true, isLocalDev),
  targetId: scopeId  // Scope ID (not connection ID)
};

await client.connect(hubConnectionProfile);

// Use operations
const result = await client.getAuditApiApi().listAuditLogs(/* parameters */);
const result = await client.getAuthApiApi().getTokenProperties(/* parameters */);
const result = await client.getCredentialApiApi().listCardFormats(/* parameters */);
const result = await client.getEntryApiApi().get(/* parameters */);
const result = await client.getGroupApiApi().get(/* parameters */);
const result = await client.getIdentityProviderApiApi().getIdentityProviderGroupRelations(/* parameters */);
const result = await client.getRoleApiApi().listRoleUsers(/* parameters */);
const result = await client.getScheduleApiApi().listScheduleEvents(/* parameters */);
const result = await client.getSiteApiApi().list(/* parameters */);
const result = await client.getUserApiApi().get(/* parameters */);
const result = await client.getZoneApiApi().listZoneShares(/* parameters */);
```

### React Component Example

```typescript
import { useState, useEffect } from 'react';
import { AvigilonAltaAccessClient, newAvigilonAltaAccess } from 'module-client-ts';
import { getZerobiasClientUrl } from '@auditmation/zb-client-lib-js';
import { useCurrentUser } from '@/context/CurrentUserContext';

function AvigilonAltaAccessComponent({ scopeId }: { scopeId: string }) {
  const [client, setClient] = useState<AvigilonAltaAccessClient | null>(null);
  const [data, setData] = useState([]);
  const { user, org } = useCurrentUser();

  useEffect(() => {
    if (scopeId && user) {
      const initClient = async () => {
        const newClient = newAvigilonAltaAccess();
        
        const hubConnectionProfile = {
          server: getZerobiasClientUrl('hub', true),
          targetId: scopeId
        };
        
        await newClient.connect(hubConnectionProfile);
        setClient(newClient);
        
        // Example: fetch initial data
        const result = await newClient.getAuditApiApi().listAuditLogs();
        setData(result.items || []);
        const result = await newClient.getAuthApiApi().getTokenProperties();
        setData(result.items || []);
        const result = await newClient.getCredentialApiApi().listCardFormats();
        setData(result.items || []);
        const result = await newClient.getEntryApiApi().get();
        setData(result.items || []);
        const result = await newClient.getGroupApiApi().get();
        setData(result.items || []);
        const result = await newClient.getIdentityProviderApiApi().getIdentityProviderGroupRelations();
        setData(result.items || []);
        const result = await newClient.getRoleApiApi().listRoleUsers();
        setData(result.items || []);
        const result = await newClient.getScheduleApiApi().listScheduleEvents();
        setData(result.items || []);
        const result = await newClient.getSiteApiApi().list();
        setData(result.items || []);
        const result = await newClient.getUserApiApi().get();
        setData(result.items || []);
        const result = await newClient.getZoneApiApi().listZoneShares();
        setData(result.items || []);
      };
      
      initClient();
    }
  }, [scopeId, user]);

  return (
    <div>
      {/* Render your data */}
    </div>
  );
}
```

## Usage in Collector Bots

Collector bots run within the platform and have authenticated context:

```typescript
import { AvigilonAltaAccessClient, newAvigilonAltaAccess } from 'module-client-ts';

export async function collect(context: CollectorContext) {
  const client = newAvigilonAltaAccess();
  
  // Collector bots get scopeId from context
  const hubConnectionProfile = {
    server: context.hubUrl,
    targetId: context.scopeId
  };
  
  await client.connect(hubConnectionProfile);
  
  // Collect data
  const data = await client.getAuditApiApi().listAuditLogs();
  const data = await client.getAuthApiApi().getTokenProperties();
  const data = await client.getCredentialApiApi().listCardFormats();
  const data = await client.getEntryApiApi().get();
  const data = await client.getGroupApiApi().get();
  const data = await client.getIdentityProviderApiApi().getIdentityProviderGroupRelations();
  const data = await client.getRoleApiApi().listRoleUsers();
  const data = await client.getScheduleApiApi().listScheduleEvents();
  const data = await client.getSiteApiApi().list();
  const data = await client.getUserApiApi().get();
  const data = await client.getZoneApiApi().listZoneShares();
  
  // Transform and return for storage
  return data.map(item => ({
    // Transform to AuditgraphDB format
  }));
}
```

## Direct Import (Node.js)

When running in Node.js with direct access to the target system:

```typescript
import { AvigilonAltaAccessProducer } from 'module';

const producer = new AvigilonAltaAccessProducer();

// Connect with credentials
await producer.connect({
  // Connection profile properties
});

// Use operations directly
const result = await producer.listAuditLogs(/* parameters */);
const result = await producer.getTokenProperties(/* parameters */);
const result = await producer.listCardFormats(/* parameters */);
const result = await producer.get(/* parameters */);
const result = await producer.get(/* parameters */);
const result = await producer.getIdentityProviderGroupRelations(/* parameters */);
const result = await producer.listRoleUsers(/* parameters */);
const result = await producer.listScheduleEvents(/* parameters */);
const result = await producer.list(/* parameters */);
const result = await producer.get(/* parameters */);
const result = await producer.listZoneShares(/* parameters */);

// Disconnect when done
await producer.disconnect();
```

## Finding Connections and Scopes

To use this module in a browser, you need to:

1. **Find Connections** that use this module:
```typescript
const searchBody = {
  modules: [moduleId], // Module ID for AvigilonAltaAccess
};

const connections = await hubClient.getConnectionApi()
  .search(searchBody, 1, 50);
```

2. **Get Scopes** for the connection:
```typescript
const searchScopeBody = {
  connections: [connectionId],
};

const scopes = await hubClient.getScopeApi()
  .search(searchScopeBody, 1, 50);
```

3. **Use Scope ID** to connect (not connection ID):
```typescript
const hubConnectionProfile = {
  server: hubUrl,
  targetId: scopeId  // This is the key!
};
```

## API Reference

### AuditApi

#### listAuditLogs

Retrieves audit logs for the organization

```typescript
listAuditLogs(organizationIdfilteroptionspageNumberpageSize): Promise<PagedResults&lt;AuditLogEntry&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `filter` (optional) - Filter criteria for audit logs (e.g., \&quot;timestamp:(1753282000--1753284000)\&quot;)
- `options` (optional) - Search options (e.g., \&quot;searchId:123-456-0\&quot;)
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;AuditLogEntry&gt;`


### AuthApi

#### getTokenProperties

Retrieves properties and metadata for the current access token

```typescript
getTokenProperties(): Promise<TokenProperties>
```


**Returns:** `TokenProperties`


### CredentialApi

#### listCardFormats

Retrieves all card formats in the organization

```typescript
listCardFormats(organizationIdpageNumberpageSize): Promise<PagedResults&lt;CardFormat&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;CardFormat&gt;`

#### listCredentialActionTypes

Retrieves all credential action types in the organization

```typescript
listCredentialActionTypes(organizationIdpageNumberpageSize): Promise<PagedResults&lt;CredentialActionType&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;CredentialActionType&gt;`

#### listCredentialActions

Retrieves all actions performed on a specific credential

```typescript
listCredentialActions(organizationIdcredentialIdpageNumberpageSize): Promise<PagedResults&lt;CredentialAction&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `credentialId` (required) - Unique identifier for a credential
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;CredentialAction&gt;`

#### listCredentialTypes

Retrieves all credential types in the organization

```typescript
listCredentialTypes(organizationIdpageNumberpageSize): Promise<PagedResults&lt;CredentialType&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;CredentialType&gt;`

#### listOrgCredentials

Retrieves all credentials in the organization

```typescript
listOrgCredentials(organizationIdpageNumberpageSize): Promise<PagedResults&lt;OrgCredential&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;OrgCredential&gt;`


### EntryApi

#### get

Retrieves detailed information for a specific entry

```typescript
get(organizationIdentryId): Promise<EntryInfo>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `entryId` (required) - Unique identifier for an entry

**Returns:** `EntryInfo`

#### list

Retrieves all entries in the organization

```typescript
list(organizationIdpageNumberpageSize): Promise<PagedResults&lt;Entry&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Entry&gt;`

#### listActivity

Retrieves activity report for a specific entry

```typescript
listActivity(organizationIdentryIdpageNumberpageSize): Promise<PagedResults&lt;EntryActivityEvent&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `entryId` (required) - Unique identifier for an entry
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;EntryActivityEvent&gt;`

#### listCameras

Retrieves all cameras associated with a specific entry

```typescript
listCameras(organizationIdentryIdpageNumberpageSize): Promise<PagedResults&lt;EntryCamera&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `entryId` (required) - Unique identifier for an entry
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;EntryCamera&gt;`

#### listEntryStates

Retrieves all entry states in the organization

```typescript
listEntryStates(organizationIdpageNumberpageSize): Promise<PagedResults&lt;EntryStateInfo&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;EntryStateInfo&gt;`

#### listUserSchedules

Retrieves all active users with their associated schedules that have access to a specific entry

```typescript
listUserSchedules(organizationIdentryIdpageNumberpageSize): Promise<PagedResults&lt;EntryUserSchedule&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `entryId` (required) - Unique identifier for an entry
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;EntryUserSchedule&gt;`

#### listUsers

Retrieves all active users that have access to a specific entry

```typescript
listUsers(organizationIdentryIdpageNumberpageSize): Promise<PagedResults&lt;EntryUser&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `entryId` (required) - Unique identifier for an entry
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;EntryUser&gt;`


### GroupApi

#### get

Retrieves single access group details by group ID

```typescript
get(organizationIdgroupId): Promise<GroupInfo>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `groupId` (required) - Unique identifier for a group

**Returns:** `GroupInfo`

#### listEntries

Retrieves all entries/permissions for a specific group

```typescript
listEntries(organizationIdgroupIdpageNumberpageSize): Promise<PagedResults&lt;Entry&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `groupId` (required) - Unique identifier for a group
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Entry&gt;`

#### listUsers

Retrieves all users belonging to a specific group

```typescript
listUsers(organizationIdgroupIdpageNumberpageSize): Promise<PagedResults&lt;User&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `groupId` (required) - Unique identifier for a group
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;User&gt;`

#### listZoneGroups

Retrieves all zones and their associated configurations for a specific group

```typescript
listZoneGroups(organizationIdgroupIdpageNumberpageSize): Promise<PagedResults&lt;GroupZoneGroup&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `groupId` (required) - Unique identifier for a group
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;GroupZoneGroup&gt;`

#### listZones

Retrieves all zones for a specific group

```typescript
listZones(organizationIdgroupIdpageNumberpageSize): Promise<PagedResults&lt;GroupZone&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `groupId` (required) - Unique identifier for a group
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;GroupZone&gt;`

#### list

Retrieves all access groups in the organization

```typescript
list(organizationIdpageNumberpageSize): Promise<PagedResults&lt;Group&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Group&gt;`


### IdentityProviderApi

#### getIdentityProviderGroupRelations

Retrieves group relations for a specific identity provider

```typescript
getIdentityProviderGroupRelations(organizationIdidentityProviderIdpageNumberpageSize): Promise<PagedResults&lt;IdentityProviderGroupRelation&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `identityProviderId` (required) - Unique identifier for an identity provider
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;IdentityProviderGroupRelation&gt;`

#### getIdentityProviderType

Retrieves detailed information for a specific identity provider type

```typescript
getIdentityProviderType(organizationIdidentityProviderTypeId): Promise<IdentityProviderTypeInfo>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `identityProviderTypeId` (required) - Unique identifier for an identity provider type

**Returns:** `IdentityProviderTypeInfo`

#### listIdentityProviderGroups

Retrieves all groups from a specific identity provider

```typescript
listIdentityProviderGroups(organizationIdidentityProviderIdpageNumberpageSize): Promise<PagedResults&lt;IdentityProviderGroup&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `identityProviderId` (required) - Unique identifier for an identity provider
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;IdentityProviderGroup&gt;`

#### listIdentityProviderTypes

Retrieves all identity provider types in the organization

```typescript
listIdentityProviderTypes(organizationIdpageNumberpageSize): Promise<PagedResults&lt;IdentityProviderType&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;IdentityProviderType&gt;`

#### listIdentityProviders

Retrieves all identity providers in the organization

```typescript
listIdentityProviders(organizationIdpageNumberpageSize): Promise<PagedResults&lt;IdentityProvider&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;IdentityProvider&gt;`


### RoleApi

#### listRoleUsers

Retrieves all users assigned to a specific role

```typescript
listRoleUsers(organizationIdroleIdpageNumberpageSize): Promise<PagedResults&lt;RoleUser&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `roleId` (required) - Unique identifier for a role
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;RoleUser&gt;`

#### listRoles

Retrieves all roles in the organization

```typescript
listRoles(organizationIdpageNumberpageSize): Promise<PagedResults&lt;RoleInfo&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;RoleInfo&gt;`


### ScheduleApi

#### listScheduleEvents

Retrieves all events for a specific schedule

```typescript
listScheduleEvents(organizationIdscheduleIdpageNumberpageSize): Promise<PagedResults&lt;ScheduleEvent&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `scheduleId` (required) - Unique identifier for a schedule
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;ScheduleEvent&gt;`

#### listScheduleTypes

Retrieves all schedule types in the organization

```typescript
listScheduleTypes(organizationIdpageNumberpageSize): Promise<PagedResults&lt;ScheduleType&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;ScheduleType&gt;`

#### listSchedules

Retrieves all schedules in the organization

```typescript
listSchedules(organizationIdpageNumberpageSize): Promise<PagedResults&lt;Schedule&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Schedule&gt;`


### SiteApi

#### list

Retrieves all sites in the organization

```typescript
list(organizationIdpageNumberpageSize): Promise<PagedResults&lt;Site&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Site&gt;`


### UserApi

#### get

Retrieves single user details by user ID

```typescript
get(organizationIduserId): Promise<UserInfo>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user

**Returns:** `UserInfo`

#### listOrgIdentities

Retrieves all identities in the organization

```typescript
listOrgIdentities(organizationIdpageNumberpageSize): Promise<PagedResults&lt;OrgIdentity&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;OrgIdentity&gt;`

#### listOrgPictures

Retrieves all organization pictures

```typescript
listOrgPictures(organizationIdpageNumberpageSize): Promise<PagedResults&lt;OrgPicture&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;OrgPicture&gt;`

#### listSharedUsers

Retrieves all users shared from other organizations

```typescript
listSharedUsers(organizationIdpageNumberpageSize): Promise<PagedResults&lt;SharedUser&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;SharedUser&gt;`

#### listActivity

Retrieves activity report for a specific user

```typescript
listActivity(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserActivityEvent&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserActivityEvent&gt;`

#### listCredentials

Retrieves all credentials for a specific user

```typescript
listCredentials(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserCredential&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserCredential&gt;`

#### listEntries

Retrieves all entries/access permissions for a specific user

```typescript
listEntries(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserEntry&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserEntry&gt;`

#### listGroups

Retrieves all groups a specific user belongs to

```typescript
listGroups(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;Group&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Group&gt;`

#### listMfaCredentials

Retrieves all MFA credentials for a specific user

```typescript
listMfaCredentials(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;MfaCredential&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;MfaCredential&gt;`

#### listPictures

Retrieves all pictures for a specific user

```typescript
listPictures(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserPicture&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserPicture&gt;`

#### listRoles

Retrieves all roles assigned to a specific user

```typescript
listRoles(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;Role&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Role&gt;`

#### listSites

Retrieves all sites associated with a specific user

```typescript
listSites(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;Site&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Site&gt;`

#### listZoneUsers

Retrieves all zones and their associated configurations a user has access to

```typescript
listZoneUsers(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserZoneUser&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserZoneUser&gt;`

#### listZones

Retrieves all zones associated with a specific user

```typescript
listZones(organizationIduserIdpageNumberpageSize): Promise<PagedResults&lt;UserZone&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `userId` (required) - Unique identifier for a user
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;UserZone&gt;`

#### list

Retrieves all users in the organization

```typescript
list(organizationIdpageNumberpageSize): Promise<PagedResults&lt;User&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;User&gt;`


### ZoneApi

#### listZoneShares

Retrieves all zone shares for a specific zone

```typescript
listZoneShares(organizationIdzoneIdpageNumberpageSize): Promise<PagedResults&lt;ZoneShare&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `zoneId` (required) - Unique identifier for a zone
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;ZoneShare&gt;`

#### listZoneUsers

Retrieves all zone users with their access configurations for a specific zone

```typescript
listZoneUsers(organizationIdzoneIdpageNumberpageSize): Promise<PagedResults&lt;ZoneZoneUser&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `zoneId` (required) - Unique identifier for a zone
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;ZoneZoneUser&gt;`

#### list

Retrieves all zones in the organization

```typescript
list(organizationIdpageNumberpageSize): Promise<PagedResults&lt;Zone&gt;>
```

**Parameters:**
- `organizationId` (required) - Unique identifier for the organization
- `pageNumber` (optional) - The requested page. This value is 1-indexed.
- `pageSize` (optional) - The number of items in each page of data.

**Returns:** `PagedResults&lt;Zone&gt;`



## Error Handling

```typescript
try {
  const result = await client.getSomeApi().someOperation();
} catch (error) {
  if (error.response?.status === 404) {
    // Scope not found
  } else if (error.response?.status === 403) {
    // No permission for this scope/operation
  } else if (error.response?.status === 503) {
    // Hub Node offline or unreachable
  }
}
```

## Authentication

- **Browser**: Authentication handled via cookies (Dana session)
- **Collector Bots**: Authenticated context provided by platform
- **Direct Import**: Use connection profile credentials

## Debugging

Enable debug logging:

```typescript
const client = newAvigilonAltaAccess({ debug: true });
```

Check module registration:
```bash
hub-node module list | grep AvigilonAltaAccess
```

## Best Practices

1. **Always use Scope ID** in browser/remote contexts (not Connection ID)
2. **Handle disconnections** gracefully in long-running applications
3. **Cache client instances** when possible to avoid reconnection overhead
4. **Implement retry logic** for transient network failures
5. **Use TypeScript** for type safety and better IDE support

## Related Documentation

- Hub Platform: https://docs.zerobias.com/hub
- Module Repository: See module README for implementation details

---

Generated with [OpenAPI Generator](https://openapi-generator.tech) version 2.0.14