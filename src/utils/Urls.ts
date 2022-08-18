import { API_URL } from "./Axios";
import { AxiosResponse } from "axios";
import { Pokemon } from "../shared_types/pokemon";

export const getPokemonsURL = `${API_URL}/?idAuthor=1`;
export const postPokemonsURL = getPokemonsURL;
export const getPokemonURLByID = (id: number) => `${API_URL}/${id}`;
export const putPokemonURLByID = getPokemonURLByID;
export const deletePokemonURLByID = getPokemonURLByID;

export type PokemonsResponse = AxiosResponse<Pokemon[]>;
export type PostPokemonResponse = AxiosResponse<Pokemon>;
export type PutPokemonResponse = PostPokemonResponse;

interface DeletePokemonResponseBody {
  success: boolean;
  type: string;
}

export type DeletePokemonResponse = AxiosResponse<DeletePokemonResponseBody>;
