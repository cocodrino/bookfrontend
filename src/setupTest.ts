import "@testing-library/jest-dom";
import { mswServer } from "./mock/msw_server";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
