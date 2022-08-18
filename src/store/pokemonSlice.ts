import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../shared_types/pokemon";
import { AppDispatch } from "./store";
import { Axios } from "../utils/Axios";
import {
  DeletePokemonResponse,
  deletePokemonURLByID,
  getPokemonsURL,
  PokemonsResponse,
  PostPokemonResponse,
  postPokemonsURL,
  PutPokemonResponse,
  putPokemonURLByID,
} from "../utils/Urls";
import { toast } from "react-toastify";

export interface PokemonState {
  pokemons: Pokemon[];
}

const initialState: PokemonState = {
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    loadPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      return { pokemons: action.payload };
    },

    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      // Redux Toolkit usa Immer, que detecta cambios en el estado y produce un nuevo estado
      // inmutable, personalmente casi nunca lo uso, pero coloco el ejemplo
      state.pokemons.push(action.payload);
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      return {
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };
    },
    updatePokemon: (state, action: PayloadAction<Pokemon>) => {
      return {
        pokemons: state.pokemons.map((pokemon) => {
          if (pokemon.id === action.payload.id) return action.payload;
          return pokemon;
        }),
      };
    },

    deletePokemon: (state, action: PayloadAction<number>) => {
      return {
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };
    },
  },
});

export const asyncLoadPokemons = () => async (dispatch: AppDispatch) => {
  const result: PokemonsResponse = await Axios.get(getPokemonsURL);
  dispatch(pokemonSlice.actions.loadPokemons(result.data));
};

export const asyncSavePokemon =
  (pokemon: Pokemon) => async (dispatch: AppDispatch) => {
    try {
      const response: PostPokemonResponse = await Axios.post(
        postPokemonsURL,
        pokemon
      );

      if (response.status == 200 && response.data.id) {
        dispatch(pokemonSlice.actions.addPokemon(response.data));
        toast("pokemon was saved");
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      console.error(`error saving pokemon ${e}`);
    }
  };

export const asyncUpdatePokemon =
  (pokemon: Pokemon) => async (dispatch: AppDispatch) => {
    if (!pokemon.id) {
      console.error(`you need the id in order to update pokemon ${pokemon}`);
      return;
    }
    try {
      const response: PutPokemonResponse = await Axios.post(
        putPokemonURLByID(pokemon.id),
        pokemon
      );

      if (response.status == 200 && response.data.id) {
        dispatch(pokemonSlice.actions.updatePokemon(response.data));
        toast("pokemon was updated");
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      console.error(`error saving pokemon ${e}`);
    }
  };

export const asyncDeletePokemon =
  (id: number) => async (dispatch: AppDispatch) => {
    if (id) {
      console.error(`you need the id in order to update pokemon`);
      return;
    }
    try {
      const response: DeletePokemonResponse = await Axios.delete(
        deletePokemonURLByID(id)
      );

      if (response.status == 200 && response.data.id) {
        dispatch(pokemonSlice.actions.deletePokemon(id));
      } else {
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      console.error(`error saving pokemon ${e}`);
    }
  };

export default pokemonSlice.reducer;
