import { AxiosRequestConfig } from 'axios';
import { __IMPL_NAME__Connector } from '../generated/api';
import { __IMPL_NAME__Impl } from './__IMPL_NAME__Impl';

export * from '../generated/api';
export * from '../generated/model';

export function new__IMPL_NAME__(axiosConfig: AxiosRequestConfig = { validateStatus: () => true }): __IMPL_NAME__Connector {
  return new __IMPL_NAME__Impl(axiosConfig);
}
