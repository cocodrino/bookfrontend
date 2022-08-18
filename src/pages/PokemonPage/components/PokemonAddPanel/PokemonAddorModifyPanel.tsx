import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Pokemon } from "../../../../shared_types/pokemon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  asyncSavePokemon,
  asyncUpdatePokemon,
} from "../../../../store/pokemonSlice";
import { pokemonPanelSlice } from "../../../../store/pokemonPanelSlice";

function PokemonAddorModifyPanel() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [defense, setDefense] = useState("50");
  const [attack, setAttack] = useState("50");
  const pokemonPanel = useAppSelector((state) => state.pokemonPanel);

  const dispatch = useAppDispatch();

  const selectedPokemon = useMemo(
    () => pokemonPanel.selectedPokemon,
    [pokemonPanel.selectedPokemon]
  );

  useEffect(() => {
    setName(selectedPokemon?.name || "");
    setUrl(selectedPokemon?.image || "");
    setDefense(selectedPokemon?.defense || "50");
    setAttack(selectedPokemon?.attack || "50");
  }, [selectedPokemon?.id]);

  const isUpdateAction = useMemo(() => {
    return !!selectedPokemon?.id;
  }, [selectedPokemon?.id]);

  const onClosePanel = () => {
    dispatch(pokemonPanelSlice.actions.clearPanelData());
  };

  const onSubmit = (e: SyntheticEvent) => {
    //if pokemon exist type hp and author is override, else set default values
    const pokemon: Pokemon = {
      type: "undefined",
      hp: 100,
      id_author: 1,
      ...(selectedPokemon || {}),
      name,
      image: url,
      attack,
      defense,
    };
    isUpdateAction
      ? dispatch(asyncSavePokemon(pokemon))
      : dispatch(asyncUpdatePokemon(pokemon));

    onClosePanel();
    e.preventDefault();
  };

  return (
    <div className="pokemon_add_panel">
      <div>Nuevo Pokemon</div>
      <div className="pokemon_add_panel_parameters">
        <form onSubmit={onSubmit}>
          <div role="pokemon_add_panel_parameter">
            <label htmlFor="Name">Nombre:</label>
            <input
              type="text"
              name="Name"
              value={name}
              data-testid="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div role="pokemon_add_panel_parameter">
            <label htmlFor="Image">Imagen:</label>
            <input
              type="url"
              name="Image"
              placeholder="url"
              value={url}
              data-testid="image"
              required
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div role="pokemon_add_panel_parameter">
            <label htmlFor="Attack">Ataque:</label>
            <input
              type="range"
              name="Attack"
              min="0"
              max="100"
              value={attack}
              onChange={(e) => setAttack(e.target.value)}
            />
          </div>

          <div role="pokemon_add_panel_parameter">
            <label htmlFor="Defense">Defensa:</label>
            <input
              type="range"
              name="Defense"
              min="0"
              max="100"
              value={defense}
              onChange={(e) => setDefense(e.target.value)}
            />
          </div>

          <div className="pokemon_add_panel_buttons">
            <button
              role="save_pokemon"
              type="submit"
              disabled={name === "" || url === ""}
            >
              {isUpdateAction ? "Actualizar" : "Guardar"}
            </button>
            <button onClick={onClosePanel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PokemonAddorModifyPanel;
