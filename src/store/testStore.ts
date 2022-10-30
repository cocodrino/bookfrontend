import { configureStore } from "@reduxjs/toolkit";
import { bookListAnswer } from "../mock/book.handlers";
import bookReducer from "./book.slice";
import authorReducer from "./author.slice";
import panelReducer, { AddOrEditPanelParams } from "./add_or_edit_panel.slice";
import { authorListAnswer } from "../mock/author.handlers";
import { AddOrEditPanelOption } from "../shared_types/add_or_edit";

const panel: AddOrEditPanelParams = {
  panelOption: "none" as AddOrEditPanelOption,
  selectedAuthor: undefined,
  selectedBook: undefined,
};

export const basicStore = {
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
    panel,
  },
};

const testStore = configureStore(basicStore);

export default testStore;
