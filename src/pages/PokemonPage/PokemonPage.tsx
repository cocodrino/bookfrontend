import { useState, useLayoutEffect, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { asyncLoadPokemons } from "../../store/pokemonSlice";
import PokemonTable from "./components/PokemonTable";
import PokemonAddorModifyPanel from "./components/PokemonAddPanel/PokemonAddorModifyPanel";
import { Pokemon } from "../../shared_types/pokemon";
import { pokemonPanelSlice } from "../../store/pokemonPanelSlice";

function PokemonPage() {
  const [inputValue, setInputValue] = useState("");
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const showAddEditPokemonPanel = useAppSelector(
    (state) => state.pokemonPanel.showPanel
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();

  const dispatch = useAppDispatch();
  const filteredPokemons = useMemo(() => {
    return pokemons?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, pokemons]);

  useEffect(() => {
    console.info(filteredPokemons);
  }, [filteredPokemons]);

  useLayoutEffect(() => {
    dispatch(asyncLoadPokemons());
  }, [dispatch]);

  return (
    <div className="pokemon pt-14 px-10 h-screen">
      <div className="pokemon__head_controls flex flex-col md:flex-row justify-between md:items-end p-6 mt-10">
        <div className="pokemon_search">
          <div className="mb-2 font-medium text-lg">Listado de Pokemon</div>
          <input
            className="border border-violet-500 px-2 py-3 rounded-lg"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            data-testid="pokemon_search"
          />
        </div>
        <button
          className="add_new_pokemon px-7 py-4 text-xl bg-violet-700 hover:bg-violet-900 rounded-md text-slate-50 mt-10 md:mt-0"
          onClick={() => dispatch(pokemonPanelSlice.actions.togglePanel())}
        >
          + Nuevo
        </button>
      </div>

      <div>
        <PokemonTable pokemons={filteredPokemons} />
      </div>

      {showAddEditPokemonPanel && <PokemonAddorModifyPanel />}
    </div>
  );
}

export default PokemonPage;
