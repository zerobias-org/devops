/**
 * Test file demonstrating usage of the api-client SDK pattern
 *
 * The api-client SDK uses BaseApiClient for direct HTTP access.
 * It provides:
 * - connect(connectionProfile) - Connect with URL, apiKey, orgId
 * - disconnect() - Disconnect from service
 * - isConnected() - Check connection status
 * - enableRequestInspection() - Enable debug logging
 * - getRequestInspector() - Access request/response logs
 * - getXxxApi() - Get individual API instances
 */
import { newAvigilonAltaAccess, } from '@zerobias-org/module-avigilon-alta-access-sdk';
async function main() {
    console.log('=== Testing api-client SDK (Direct HTTP) ===\n');
    // Create a new client instance using the factory function
    const client = newAvigilonAltaAccess();
    console.log('1. Created client instance');
    console.log(`   isConnected: ${client.isConnected()}`);
    // Connection profile for direct HTTP access
    const connectionProfile = {
        url: 'https://api.avigilon-alta.example.com',
        apiKey: 'your-api-key-here',
        orgId: '00000000-0000-0000-0000-000000000001',
    };
    console.log('\n2. Connection Profile:');
    console.log(`   url: ${connectionProfile.url}`);
    console.log(`   apiKey: ${connectionProfile.apiKey?.substring(0, 10)}...`);
    console.log(`   orgId: ${connectionProfile.orgId}`);
    // Note: Actual connection would fail without valid credentials
    // This is just demonstrating the API pattern
    console.log('\n3. SDK Usage Pattern:');
    console.log(`
  // Connect to service
  await client.connect(connectionProfile);

  // Check connection
  if (client.isConnected()) {
    // Get API instances
    const userApi = client.getUserApi();
    const siteApi = client.getSiteApi();
    const entryApi = client.getEntryApi();

    // Make API calls
    const users = await userApi.listUsers();
    const sites = await siteApi.listSites();

    // Enable request inspection for debugging
    client.enableRequestInspection(true);
    const entries = await entryApi.listEntries();
    const inspector = client.getRequestInspector();
    console.log('Last request:', inspector?.getLastRequest());

    // Disconnect when done
    await client.disconnect();
  }
  `);
    console.log('\n4. Available APIs:');
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
    console.log('\n=== api-client SDK test complete ===');
}
main().catch(console.error);
