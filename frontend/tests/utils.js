import { getResponse, http, HttpResponse } from "msw";
import { handlers } from "./mocks/handlers";
import { server } from "./mocks/server";
import delay from "delay";

export const addResultsKeyToResponse = async (endpoint) => {
  const request = new Request(`http://localhost:3000${endpoint}`);
  const response = await getResponse(handlers, request);
  const data = await response?.json();
  server.use(
    http.get(endpoint, async () => {
      return HttpResponse.json({ results: [...data] });
    })
  );
};
export const simulateDelay = (endpoint, method, ms) => {
  server.use(
    http[method](endpoint, async () => {
      console.log(`http://localhost:3000${endpoint}`);
      const request = new Request(`http://localhost:3000${endpoint}`);
      const response = await getResponse(handlers, request);
      await delay(ms);
      return response;
    })
  );
};
export const simulateError = (endpoint, method) => {
  server.use(
    http[method](endpoint, () => HttpResponse.error())
  );
};