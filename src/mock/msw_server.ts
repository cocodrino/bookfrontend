import { bookHandlers } from "./book.handlers";
import { setupServer, SetupServerApi } from "msw/node";
import { authorHandlers } from "./author.handlers";

const handlers = [...bookHandlers, ...authorHandlers];
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const mswServer: SetupServerApi = setupServer(...handlers);
