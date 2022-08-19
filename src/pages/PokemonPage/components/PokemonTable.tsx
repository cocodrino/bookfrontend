import { Pokemon } from "../../../shared_types/pokemon";
import DefaultPokemonImage from "../../../static/default.jpeg";
import { useAppDispatch } from "../../../store/hooks";
import { pokemonPanelSlice } from "../../../store/pokemonPanelSlice";
import { asyncDeletePokemon } from "../../../store/pokemonSlice";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

interface PokemonListItemProps {
  pokemons: Pokemon[];
}

function PokemonTable({ pokemons }: PokemonListItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="pokemon_table">
      <div className="pokemon_table__header grid grid-cols-5 bg-slate-100">
        <div className="border flex justify-center items-center py-3 text-xl">
          Nombre
        </div>
        <div className="border flex justify-center items-center text-xl">
          Imagen
        </div>
        <div className="border flex justify-center items-center text-xl">
          Ataque
        </div>
        <div className="border flex justify-center items-center text-xl">
          Defensa
        </div>
        <div className="border flex justify-center items-center text-xl">
          Acciones
        </div>
      </div>

      <div className="pokemon_table__body bg-slate-50">
        {pokemons.map((pokemon) => (
          <div
            key={`pokemon_row_${pokemon.id}`}
            role="pokemon_row"
            className="grid grid-cols-5"
          >
            <div className="border border-slate-100 flex justify-center items-center text-lg">
              {pokemon.name}
            </div>

            <div className="border border-slate-100 flex justify-center items-center py-2">
              <img
                className="w-12 m-auto"
                src={pokemon.image || DefaultPokemonImage}
                alt=""
              />{" "}
            </div>

            <div className="border border-slate-100 flex justify-center items-center text-lg">
              {pokemon.attack}
            </div>

            <div className="border border-slate-100 flex justify-center items-center text-lg">
              {pokemon.defense}
            </div>

            <div className="border border-slate-100 flex justify-center items-center text-xl">
              <button
                className="px-2 hover:text-violet-600"
                onClick={() =>
                  dispatch(
                    pokemonPanelSlice.actions.setSelectedPokemon(pokemon)
                  )
                }
              >
                <FiEdit3 />
              </button>
              <button
                className="px-2 hover:text-violet-600"
                onClick={() => {
                  pokemon.id && dispatch(asyncDeletePokemon(pokemon.id));
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonTable;
