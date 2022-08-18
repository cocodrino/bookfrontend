import { Pokemon } from "../../../shared_types/pokemon";
import DefaultPokemonImage from "../../../static/default.jpeg";

interface PokemonListItemProps {
  pokemons: Pokemon[];
  editPokemonFn: (p: Pokemon) => void;
  deletePokemonFn: (id: number) => void;
}

function PokemonTable({
  pokemons,
  editPokemonFn,
  deletePokemonFn,
}: PokemonListItemProps) {
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
          <div key={`pokemon_row_${pokemon.id}`}>
            <div>{pokemon.name}</div>
            <div>
              <img src={pokemon.image || DefaultPokemonImage} alt="" />{" "}
            </div>
            <div>{pokemon.attack}</div>
            <div>{pokemon.defense}</div>
            <div>
              <button onClick={() => editPokemonFn(pokemon)}>edit</button>
              <button onClick={() => pokemon.id && deletePokemonFn(pokemon.id)}>
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
