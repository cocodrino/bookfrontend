import { handlers } from "./handlers";
import { setupWorker, SetupWorkerApi } from "msw";

const mswWorker: SetupWorkerApi = setupWorker(...handlers);
export default mswWorker;
