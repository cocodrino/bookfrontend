import { configureStore } from "@reduxjs/toolkit";
import { bookListAnswer } from "../mock/book.handlers";
import bookReducer from "./book.slice";
import authorReducer from "./author.slice";
import panelReducer from "./add_or_edit_panel.slice";
import { authorListAnswer } from "../mock/author.handlers";

const testStore = configureStore({
  reducer: {
    book: bookReducer,
    author: authorReducer,
    panel: panelReducer,
  },
  preloadedState: {
    book: {
      books: bookListAnswer.books,
    },
    author: {
      authors: authorListAnswer.authors,
    },
    panel: {
      panelOption: "none",
    },
  },
});

export default testStore;
