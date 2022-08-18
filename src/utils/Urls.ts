import { apiUrl } from "./Axios";
import { AxiosResponse } from "axios";
import { Pokemon } from "../shared_types/pokemon";

export const getPokemonsURL = `${apiUrl}/?idAuthor=1`;
export const postPokemonsURL = getPokemonsURL;
export const getPokemonURLByID = (id: number) => `${apiUrl}/${id}`;
export const putPokemonURLByID = getPokemonURLByID;
export const deletePokemonURLByID = getPokemonURLByID;

export type PokemonsResponse = AxiosResponse<Pokemon[]>;
export type PostPokemonResponse = AxiosResponse<Pokemon>;
export type PutPokemonResponse = PostPokemonResponse;
export type DeletePokemonResponse = PostPokemonResponse;
