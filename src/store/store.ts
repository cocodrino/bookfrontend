import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import bookReducer from "./book.slice";
import pokemonPanelReducer from "./pokemonPanelSlice";
import authorReducer from "./author.slice";
import panelReducer from "./add_or_edit_panel.slice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonPanel: pokemonPanelReducer,
    book: bookReducer,
    author: authorReducer,
    panel: panelReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
