import { createServer } from "miragejs";
import { collectorsGET } from "mock/schemas/collectors/GET";

export const mockServer = () => {
  createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_API_ENDPOINT as string}/sku/collectors`,
        () => {
          return {
            collectors: collectorsGET,
          };
        }
      );
    },
  });
};
