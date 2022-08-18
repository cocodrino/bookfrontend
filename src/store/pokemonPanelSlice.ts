import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../shared_types/pokemon";

export interface PokemonPanelState {
  selectedPokemon?: Pokemon;
  showPanel: boolean;
}

const initialState: PokemonPanelState = {
  showPanel: false,
};

export const pokemonPanelSlice = createSlice({
  name: "pokemonPanel",
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon>) => {
      return { ...state, showPanel: true, selectedPokemon: action.payload };
    },

    togglePanel: (state, action: PayloadAction<boolean>) => {
      return { ...state, showPanel: action.payload };
    },

    clearPanelData: () => {
      return initialState;
    },
  },
});

export default pokemonPanelSlice.reducer;
