import "./PokemonPage.css";
import { useState, useLayoutEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  asyncDeletePokemon,
  asyncLoadPokemons,
} from "../../store/pokemonSlice";
import PokemonTable from "./components/PokemonTable";
import PokemonAddorModifyPanel from "./components/PokemonAddPanel/PokemonAddorModifyPanel";
import { Pokemon } from "../../shared_types/pokemon";

function PokemonPage() {
  const [inputValue, setInputValue] = useState("");
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const [showAddEditPokemonPanel, setShowAddEditPokemonPanel] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();

  const dispatch = useAppDispatch();
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, pokemons]);

  const toggleShowAddPokemonPanel = () => {
    // if panel is open and click exit, selected must be empty
    if (showAddEditPokemonPanel && selectedPokemon)
      setSelectedPokemon(undefined);

    setShowAddEditPokemonPanel((show) => !show);
  };

  const onEditPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowAddEditPokemonPanel(true);
  };

  const onDeletePokemon = (pokemonID: number) => {
    dispatch(asyncDeletePokemon(pokemonID));
  };

  useLayoutEffect(() => {
    dispatch(asyncLoadPokemons());
  }, [dispatch]);

  return (
    <div className="pokemon">
      <div className="pokemon__head_controls">
        <div className="pokemon_search">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="add_new_pokemon" onClick={toggleShowAddPokemonPanel}>
          + Nuevo
        </button>
      </div>

      <div>
        <PokemonTable
          pokemons={filteredPokemons}
          deletePokemonFn={onDeletePokemon}
          editPokemonFn={onEditPokemon}
        />
      </div>

      {showAddEditPokemonPanel && (
        <PokemonAddorModifyPanel
          togglePanelFn={toggleShowAddPokemonPanel}
          pokemonToUpdate={selectedPokemon}
        />
      )}
    </div>
  );
}

export default PokemonPage;
