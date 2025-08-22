import { Connector, HubConnectionProfile} from '@auditmation/hub-core';
import { __IMPL_NAME__, __IMPL_NAME__HubImpl } from '../generated/api';

export * from '../generated/api';
export * from '../generated/model';

export type __IMPL_NAME__Client = __IMPL_NAME__ & Connector<HubConnectionProfile, void>;
export function new__IMPL_NAME__(): __IMPL_NAME__Client {
  return new __IMPL_NAME__HubImpl();
}
