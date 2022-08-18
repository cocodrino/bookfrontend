import "whatwg-fetch";
import "@testing-library/jest-dom";
import { mswServer } from "./src/mock/msw_server";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
