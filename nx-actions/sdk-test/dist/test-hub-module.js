/**
 * Test file demonstrating usage of the hub-module SDK pattern
 *
 * The hub-module SDK uses HubConnector for Hub-routed access.
 * It provides:
 * - newXxxHub() factory function (like api-client pattern)
 * - connect(hubConnectionProfile) - Connect with hubUrl, targetId, apiKey, orgId
 * - disconnect() - Disconnect from service
 * - isConnected() - Check connection status
 * - Routes requests through Hub: {hubUrl}/targets/{targetId}/{operationName}
 * - getXxxApi() - Get individual API instances
 */
import { newAvigilonAltaAccessHub, } from '@zerobias-org/module-avigilon-alta-access-hub-sdk';
async function main() {
    console.log('=== Testing hub-module SDK (Hub Routing) ===\n');
    // Create a new Hub client instance using the factory function
    const client = newAvigilonAltaAccessHub();
    console.log('1. Created Hub client instance using newAvigilonAltaAccessHub()');
    console.log('   Client extends HubConnector from @zerobias-org/util-connector');
    // Hub connection profile includes targetId for routing
    const hubConnectionProfile = {
        hubUrl: 'https://hub.zerobias.com',
        targetId: 'avigilon-alta-target-123',
        apiKey: 'your-hub-api-key',
        orgId: '00000000-0000-0000-0000-000000000001',
    };
    console.log('\n2. Hub Connection Profile:');
    console.log(`   hubUrl: ${hubConnectionProfile.hubUrl}`);
    console.log(`   targetId: ${hubConnectionProfile.targetId}`);
    console.log(`   apiKey: ${hubConnectionProfile.apiKey?.substring(0, 10)}...`);
    console.log(`   orgId: ${hubConnectionProfile.orgId}`);
    console.log('\n3. Hub Routing Pattern:');
    console.log(`   Requests are routed through Hub:`);
    console.log(`   {hubUrl}/targets/{targetId}/{operationName}`);
    console.log(`   Example: ${hubConnectionProfile.hubUrl}/targets/${hubConnectionProfile.targetId}/listUsers`);
    console.log('\n4. SDK Usage Pattern:');
    console.log(`
  // Connect to Hub
  await client.connect(hubConnectionProfile);

  // Get API instances (routed through Hub)
  const userApi = client.getUserApi();
  const siteApi = client.getSiteApi();
  const entryApi = client.getEntryApi();

  // API calls are routed through Hub to the target
  // Hub handles: authentication, routing, connection management
  const users = await userApi.listUsers();
  const sites = await siteApi.listSites();

  // Disconnect when done
  await client.disconnect();
  `);
    console.log('\n5. Key Differences from api-client:');
    console.log('   - Uses HubConnector base class (not BaseApiClient)');
    console.log('   - Requires targetId in connection profile');
    console.log('   - Requests routed through Hub server');
    console.log('   - Hub handles target discovery and connection');
    console.log('   - Useful for accessing modules through Hub infrastructure');
    console.log('\n6. Available APIs (same as api-client):');
    console.log('   - getAuditApi()');
    console.log('   - getAuthApi()');
    console.log('   - getCredentialApi()');
    console.log('   - getEntryApi()');
    console.log('   - getGroupApi()');
    console.log('   - getIdentityProviderApi()');
    console.log('   - getRoleApi()');
    console.log('   - getScheduleApi()');
    console.log('   - getSiteApi()');
    console.log('   - getUserApi()');
    console.log('   - getZoneApi()');
    console.log('\n=== hub-module SDK test complete ===');
}
main().catch(console.error);
