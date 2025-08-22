import { RequestPrototype } from '@auditmation/util-api-invoker-api';
import { apiKey, jwt } from './Common';
import { ConnectionProfile } from '../generated/model';

export async function ensureRequestPrototype(
  input: RequestPrototype,
  originalRequestPrototype: RequestPrototype,
  params: any,
  connectionProfile?: ConnectionProfile
): Promise<RequestPrototype> {
  input.location.hostname = connectionProfile?.url?.hostname;
  input.location.protocol = connectionProfile?.url?.protocol as 'http' | 'https' || 'https';
  input.location.port = connectionProfile?.url?.port;
  input.location.path = `__API_PATH__${input.location.path}`;
  input.headers = {};

  let auth: string | undefined;
  if (connectionProfile?.apiKey) {
    auth = apiKey(connectionProfile?.apiKey);
    input.headers['Authorization'] = auth;
  } else if (connectionProfile?.jwt) {
    auth = jwt(connectionProfile?.jwt);
    input.headers['Authorization'] = auth;
  }

  if (connectionProfile?.orgId) {
    input.headers['dana-org-id'] = connectionProfile?.orgId;
  }
  return input;
}
