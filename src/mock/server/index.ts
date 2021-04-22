import { config } from '../../config';
import { createServer } from 'miragejs';
import { collectorsGET } from 'mock/schemas/collectors/GET';

export const mockServer = () => {
  createServer({
    routes() {
      
      this.get(`${config.backend.apiEndpoint}/sku/collectors`, () => {
        return {
          collectors: collectorsGET,
        }
      });

      this.passthrough();

      this.passthrough(`${config.backend.apiEndpoint}/skus/tiles?featured=true`);
    },
  })
};

