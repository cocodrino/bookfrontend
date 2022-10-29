import { setupWorker, SetupWorkerApi } from "msw";
import { handlers } from "./handlers";

const mswWorker: SetupWorkerApi = setupWorker(...handlers);
export default mswWorker;
