import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemons } from "../shared_types/pokemon";

export interface PokemonPanelState {
  selectedPokemon?: Pokemons;
  showPanel: boolean;
}

const initialState: PokemonPanelState = {
  showPanel: false,
};

export const pokemonPanelSlice = createSlice({
  name: "pokemonPanel",
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemons>) => {
      return { ...state, showPanel: true, selectedPokemon: action.payload };
    },

    togglePanel: (state) => {
      return { ...state, showPanel: !state.showPanel };
    },

    clearPanelData: () => {
      return initialState;
    },
  },
});

export default pokemonPanelSlice.reducer;
