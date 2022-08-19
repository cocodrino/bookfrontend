import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../shared_types/pokemon";
import { AppDispatch } from "./store";
import { Axios } from "../utils/Axios";
import {
  DeletePokemonResponse,
  PokemonsResponse,
  PostPokemonResponse,
  PutPokemonResponse,
} from "../utils/Urls";
import { toast } from "react-toastify";
import { pokemonPanelSlice } from "./pokemonPanelSlice";

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
  toast.info("LOADING POKEMONS....", { toastId: 100 });
  const result: PokemonsResponse = await Axios.get("/", {
    params: { idAuthor: 1 },
  });

  toast.update(100, {
    render: "pokemons loaded",
    type: toast.TYPE.SUCCESS,
    autoClose: 1000,
  });
  dispatch(pokemonSlice.actions.loadPokemons(result.data));
};

export const asyncSavePokemon =
  (pokemon: Pokemon) => async (dispatch: AppDispatch) => {
    try {
      pokemon.idAuthor = 1;

      const response: PostPokemonResponse = await Axios.post("/", pokemon, {
        params: { idAuthor: 1 },
      });

      if (response.status == 200 && response.data.id) {
        dispatch(pokemonSlice.actions.addPokemon(response.data));
        toast("pokemon was saved");
        dispatch(pokemonPanelSlice.actions.clearPanelData());
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
      pokemon.id_author = 1; //super raro eso de id_author y idAuthor juntos
      pokemon.idAuthor = 1;
      const response: PutPokemonResponse = await Axios.put(
        `/${pokemon.id}`,
        pokemon
      );

      if (response.status == 200 && response.data.id) {
        dispatch(pokemonSlice.actions.updatePokemon(response.data));
        toast("pokemon was updated");
        setTimeout(() => {
          dispatch(pokemonPanelSlice.actions.clearPanelData());
        }, 2000);
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
    if (!id) {
      console.error(`you need the id in order to update pokemon`);
      return;
    }
    try {
      const response: DeletePokemonResponse = await Axios.delete(`/${id}`);

      if (
        response.status == 200 &&
        response.data.success &&
        response.data.type === "pokemon_removed"
      ) {
        dispatch(pokemonSlice.actions.deletePokemon(id));
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      toast.error("Error. Please try again");
      console.error(`error saving pokemon ${e}`);
    }
  };

export default pokemonSlice.reducer;
