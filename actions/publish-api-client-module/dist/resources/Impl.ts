import { ConnectionMetadata, ConnectionStatus } from '@auditmation/hub-core';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiInvokerImpl } from '@auditmation/util-api-invoker-isomorphic';
import { ApiInvoker } from '@auditmation/util-api-invoker-api';
import { ConnectionWrapper, __IMPL_NAME__InvokerBase } from '../generated/api';
import { ConnectionProfile } from '../generated/model';

export class __IMPL_NAME__Impl extends __IMPL_NAME__InvokerBase {
  private _connectionProfile?: ConnectionProfile;

  readonly apiInvoker: ApiInvoker;

  constructor(axiosConfig: AxiosRequestConfig = { validateStatus: () => true }) {
    super();
    this.apiInvoker = new ApiInvokerImpl(axiosConfig);
  }

  get connectionProfile(): ConnectionProfile | undefined {
    return this._connectionProfile;
  }

  get connectionWrapper(): ConnectionWrapper {
    return new ConnectionWrapper(this.connectionProfile);
  }

  async connect(connectionProfile: ConnectionProfile): Promise<void> {
    this._connectionProfile = connectionProfile;
  }

  async isConnected(): Promise<boolean> {
    return this.apiInvoker.client.get('/me')
      .then((resp) => resp.status === 200);
  }

  // eslint-disable-next-line class-methods-use-this
  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  async metadata(): Promise<ConnectionMetadata> {
    return new ConnectionMetadata(ConnectionStatus.Initialized);
  }

  httpClient(): AxiosInstance | undefined {
    return this.apiInvoker.client;
  }
}
