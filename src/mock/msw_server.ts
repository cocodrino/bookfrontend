import { setupServer, SetupServerApi } from "msw/node";
import { handlers } from "./handlers";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const mswServer: SetupServerApi = setupServer(...handlers);
