import { API_URL } from "./Axios";

export const getBooksURL = `${API_URL}/books`;
export const postBooksURL = `${API_URL}/book`;
export const getBookByIDURL = (id: number) => `${API_URL}/book/${id}`;
export const putBookByIDURL = getBookByIDURL;
export const deleteBookByIDURL = getBookByIDURL;

// TODO BORRAR

import { AxiosResponse } from "axios";
import { Pokemons } from "../shared_types/pokemon";

export const getPokemonsURL = `${API_URL}/?idAuthor=1`;
export const postPokemonsURL = getPokemonsURL;
export const getPokemonURLByID = (id: number) => `${API_URL}/${id}`;
export const putPokemonURLByID = getPokemonURLByID;
export const deletePokemonURLByID = getPokemonURLByID;

export type PokemonsResponse = AxiosResponse<Pokemons[]>;
export type PostPokemonResponse = AxiosResponse<Pokemons>;
export type PutPokemonResponse = PostPokemonResponse;

interface DeletePokemonResponseBody {
  success: boolean;
  type: string;
}

export type DeletePokemonResponse = AxiosResponse<DeletePokemonResponseBody>;
