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

  let connectionProfileBasePath = '';
  if (connectionProfile
    && connectionProfile.url
    && connectionProfile.url.path
    && connectionProfile.url.path !== ''
    && connectionProfile.url.path !== '/') {
    connectionProfileBasePath = `${connectionProfile.url.path}`;
  }

  input.location.path = `${connectionProfileBasePath}__API_PATH__${input.location.path}`;
  if (input.location.path.startsWith('//')) {
    input.location.path = input.location.path.replace('//', '/');
  }

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
