import { CoreError } from '@zerobias-org/types-core-js';
import { ObjectSerializer } from '../model/index.js';
export class AuthApiMappingImpl {
    producer;
    constructor(producer) {
        this.producer = producer;
    }
    /**
     *
     * @summary Retrieves properties and metadata for the current access token
     * @openapi operation=getTokenProperties path=/accessToken method=GET
     */
    async getTokenProperties() {
        return this.producer.getTokenProperties();
    }
}
/**
 * Wrap producer with mapping implementation
 */
export function wrapAuthProducer(producer) {
    return new AuthApiMappingImpl(producer);
}
/**
 * AuthApiHttpImpl - Direct HTTP implementation
 *
 * Makes direct HTTP calls to the API using Axios.
 * Used by SDK clients for platform service access.
 */
export class AuthApiHttpImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async getTokenProperties() {
        const _queryParams = {};
        const _bodyParams = {};
        let _path = '/accessToken';
        return this.client.get(_path, { params: _queryParams })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
            if (response.status >= 400) {
                throw CoreError.deserialize(response.data);
            }
            return ObjectSerializer.deserialize(response.data, 'TokenProperties');
        })
            .catch((error) => {
            if (error.data) {
                throw CoreError.deserialize(error.data);
            }
            else {
                throw error;
            }
        });
    }
}
