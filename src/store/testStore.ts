import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import pokemonPanelReducer from "./pokemonPanelSlice";
import { pokemonListAnswer } from "../mock/book.handlers";

const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonPanel: pokemonPanelReducer,
  },
  preloadedState: {
    pokemon: {
      pokemons: pokemonListAnswer,
    },
    pokemonPanel: {
      showPanel: false,
      selectedPokemon: undefined,
    },
  },
});

export default testStore;
