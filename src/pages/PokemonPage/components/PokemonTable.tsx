import { Pokemon } from "../../../shared_types/pokemon";
import DefaultPokemonImage from "../../../static/default.jpeg";
import { useAppDispatch } from "../../../store/hooks";
import { pokemonPanelSlice } from "../../../store/pokemonPanelSlice";
import { asyncDeletePokemon } from "../../../store/pokemonSlice";

interface PokemonListItemProps {
  pokemons: Pokemon[];
}

function PokemonTable({ pokemons }: PokemonListItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="pokemon_table">
      <div className="pokemon_table__header">
        <div>Nombre</div>
        <div>Imagen</div>
        <div>Ataque</div>
        <div>Defensa</div>
        <div>Acciones</div>
      </div>

      <div className="pokemon_table__body">
        {pokemons.map((pokemon) => (
          <div key={`pokemon_row_${pokemon.id}`} role="pokemon_row">
            <div>{pokemon.name}</div>
            <div>
              <img src={pokemon.image || DefaultPokemonImage} alt="" />{" "}
            </div>
            <div>{pokemon.attack}</div>
            <div>{pokemon.defense}</div>
            <div>
              <button
                onClick={() =>
                  dispatch(
                    pokemonPanelSlice.actions.setSelectedPokemon(pokemon)
                  )
                }
              >
                edit
              </button>
              <button
                onClick={() => {
                  pokemon.id && dispatch(asyncDeletePokemon(pokemon.id));
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonTable;
