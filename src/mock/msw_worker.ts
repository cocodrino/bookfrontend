import { bookHandlers } from "./book.handlers";
import { setupWorker, SetupWorkerApi } from "msw";

const mswWorker: SetupWorkerApi = setupWorker(...bookHandlers);
export default mswWorker;
