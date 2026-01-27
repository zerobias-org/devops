# AvigilonAltaAccess SDK Usage Guide

## Installation

```bash
npm install sdk
```

## Quick Start

```typescript
import { newAvigilonAltaAccess, AvigilonAltaAccessClient } from 'sdk';

// Create client instance
const client = newAvigilonAltaAccess();

// Connect with credentials
await client.connect({
  url: 'https://your-server.example.com',
  apiKey: 'your-api-key',
  orgId: 'your-org-id'
});

// Use the API - see Available APIs section below
// Example: const result = await client.getHealthcheckApi().health();

// Disconnect when done
await client.disconnect();
```

## Authentication

### API Key Authentication

```typescript
await client.connect({
  url: 'https://api.zerobias.com',
  apiKey: 'your-api-key',
  orgId: 'your-org-uuid'
});
```

### JWT Token Authentication

```typescript
await client.connect({
  url: 'https://api.zerobias.com',
  jwt: 'your-jwt-token',
  orgId: 'your-org-uuid'
});
```

## Multi-Tenancy

### Setting Organization Context

The `orgId` parameter in the connection profile sets the organization context for all API calls:

```typescript
await client.connect({
  url: 'https://api.zerobias.com',
  apiKey: 'your-api-key',
  orgId: 'org-uuid-1'  // All calls scoped to this org
});
```

### Switching Organizations

To switch organizations, disconnect and reconnect:

```typescript
await client.disconnect();
await client.connect({
  url: 'https://api.zerobias.com',
  apiKey: 'your-api-key',
  orgId: 'org-uuid-2'  // Now scoped to different org
});
```

## Debugging

### Enable Request Inspection

```typescript
// Enable debug mode
client.enableRequestInspection(true);

// Get the inspector
const inspector = client.getRequestInspector();

// Log all requests
inspector.onRequest((config) => {
  console.log(`→ ${config.method?.toUpperCase()} ${config.url}`);
  console.log('  Headers:', config.headers);
  if (config.data) console.log('  Body:', config.data);
});

// Log all responses
inspector.onResponse((response) => {
  console.log(`← ${response.status} ${response.statusText}`);
  console.log(`  Duration: ${response.duration}ms`);
});
```

### View Request History

```typescript
client.enableRequestInspection(true);

// Make some API calls...
await client.getHealthcheckApi().health();

// Get request history
const history = inspector.getRequestHistory();
history.forEach(record => {
  console.log(`${record.method} ${record.url} - ${record.response?.status}`);
});
```

> **Warning:** Request history is stored in memory. Use callbacks (`onRequest`/`onResponse`)
> for production to avoid memory leaks.

## Error Handling

```typescript
import { CoreError } from '@zerobias-org/types-core-js';

try {
  const result = await client.getSomeApi().someMethod();
} catch (error) {
  if (error instanceof CoreError) {
    console.error('API Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Details:', error.details);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Available APIs

### AuditApi

Access via `client.getAuditApi()`

- `listAuditLogs()` - Retrieves audit logs for the organization

### AuthApi

Access via `client.getAuthApi()`

- `getTokenProperties()` - Retrieves properties and metadata for the current access token

### CredentialApi

Access via `client.getCredentialApi()`

- `listCardFormats()` - Retrieves all card formats in the organization
- `listCredentialActionTypes()` - Retrieves all credential action types in the organization
- `listCredentialActions()` - Retrieves all actions performed on a specific credential
- `listCredentialTypes()` - Retrieves all credential types in the organization
- `listOrgCredentials()` - Retrieves all credentials in the organization

### EntryApi

Access via `client.getEntryApi()`

- `get()` - Retrieves detailed information for a specific entry
- `list()` - Retrieves all entries in the organization
- `listActivity()` - Retrieves activity report for a specific entry
- `listCameras()` - Retrieves all cameras associated with a specific entry
- `listEntryStates()` - Retrieves all entry states in the organization
- `listUserSchedules()` - Retrieves all active users with their associated schedules that have access to a specific entry
- `listUsers()` - Retrieves all active users that have access to a specific entry

### GroupApi

Access via `client.getGroupApi()`

- `get()` - Retrieves single access group details by group ID
- `listEntries()` - Retrieves all entries/permissions for a specific group
- `listUsers()` - Retrieves all users belonging to a specific group
- `listZoneGroups()` - Retrieves all zones and their associated configurations for a specific group
- `listZones()` - Retrieves all zones for a specific group
- `list()` - Retrieves all access groups in the organization

### IdentityProviderApi

Access via `client.getIdentityProviderApi()`

- `getIdentityProviderGroupRelations()` - Retrieves group relations for a specific identity provider
- `getIdentityProviderType()` - Retrieves detailed information for a specific identity provider type
- `listIdentityProviderGroups()` - Retrieves all groups from a specific identity provider
- `listIdentityProviderTypes()` - Retrieves all identity provider types in the organization
- `listIdentityProviders()` - Retrieves all identity providers in the organization

### RoleApi

Access via `client.getRoleApi()`

- `listRoleUsers()` - Retrieves all users assigned to a specific role
- `listRoles()` - Retrieves all roles in the organization

### ScheduleApi

Access via `client.getScheduleApi()`

- `listScheduleEvents()` - Retrieves all events for a specific schedule
- `listScheduleTypes()` - Retrieves all schedule types in the organization
- `listSchedules()` - Retrieves all schedules in the organization

### SiteApi

Access via `client.getSiteApi()`

- `list()` - Retrieves all sites in the organization

### UserApi

Access via `client.getUserApi()`

- `get()` - Retrieves single user details by user ID
- `listOrgIdentities()` - Retrieves all identities in the organization
- `listOrgPictures()` - Retrieves all organization pictures
- `listSharedUsers()` - Retrieves all users shared from other organizations
- `listActivity()` - Retrieves activity report for a specific user
- `listCredentials()` - Retrieves all credentials for a specific user
- `listEntries()` - Retrieves all entries/access permissions for a specific user
- `listGroups()` - Retrieves all groups a specific user belongs to
- `listMfaCredentials()` - Retrieves all MFA credentials for a specific user
- `listPictures()` - Retrieves all pictures for a specific user
- `listRoles()` - Retrieves all roles assigned to a specific user
- `listSites()` - Retrieves all sites associated with a specific user
- `listZoneUsers()` - Retrieves all zones and their associated configurations a user has access to
- `listZones()` - Retrieves all zones associated with a specific user
- `list()` - Retrieves all users in the organization

### ZoneApi

Access via `client.getZoneApi()`

- `listZoneShares()` - Retrieves all zone shares for a specific zone
- `listZoneUsers()` - Retrieves all zone users with their access configurations for a specific zone
- `list()` - Retrieves all zones in the organization


## Connection Profile Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | Yes | Base URL of the API server |
| `apiKey` | string | No* | API key for authentication |
| `jwt` | string | No* | JWT token for authentication |
| `orgId` | string | Yes | Organization ID for multi-tenancy |

*Either `apiKey` or `jwt` is required for authentication.

## TypeScript Support

This SDK is written in TypeScript and includes full type definitions. All models and API
interfaces are exported for use in your TypeScript projects.

```typescript
import {
  AvigilonAltaAccessClient,
  ConnectionProfile,
  // Import models as needed
} from 'sdk';
```

## Additional Resources

- [OpenAPI Spec](./api.yml) - Raw OpenAPI specification
- [manifest.json](./generated/api/manifest.json) - Operation metadata for AI/tooling integration

---
*Generated: 2026-01-26T15:44:55Z*
*Codegen Version: 2.0.14*
