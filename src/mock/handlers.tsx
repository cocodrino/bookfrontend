import { bookHandlers } from "./book.handlers";
import { authorHandlers } from "./author.handlers";

export const handlers = [...bookHandlers, ...authorHandlers];
