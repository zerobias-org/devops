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
export class AuthApiHubImpl {
    client;
    headers;
    constructor(client, headers = {}) {
        this.client = client;
        this.headers = headers;
    }
    async getTokenProperties() {
        const _body = {};
        return this.client.put('/getTokenProperties', {
            ..._body,
        })
            .then((response) => {
            // BaseApiClient uses validateStatus: () => true, so we must check status manually
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
