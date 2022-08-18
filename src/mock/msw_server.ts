import { handlers } from "./handlers";
import { setupServer, SetupServerApi } from "msw/node";

export const mswServer: SetupServerApi = setupServer(...handlers);
