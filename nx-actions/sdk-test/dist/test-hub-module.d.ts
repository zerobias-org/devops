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
export {};
