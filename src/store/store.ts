import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./book.slice";

import authorReducer from "./author.slice";
import panelReducer from "./add_or_edit_panel.slice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorReducer,
    panel: panelReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
