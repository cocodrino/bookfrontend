import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import pokemonPanelReducer from "./pokemonPanelSlice";
import { bookListAnswer, pokemonListAnswer } from "../mock/book.handlers";
import bookReducer from "./book.slice";
import authorReducer from "./author.slice";
import panelReducer from "./add_or_edit_panel.slice";
import { authorListAnswer } from "../mock/author.handlers";

const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonPanel: pokemonPanelReducer,
    book: bookReducer,
    author: authorReducer,
    panel: panelReducer,
  },
  preloadedState: {
    pokemon: {
      pokemons: pokemonListAnswer,
    },
    pokemonPanel: {
      showPanel: false,
      selectedPokemon: undefined,
    },
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
