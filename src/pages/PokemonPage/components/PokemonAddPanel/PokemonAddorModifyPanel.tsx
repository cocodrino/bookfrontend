import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Pokemon } from "../../../../shared_types/pokemon";
import { useAppDispatch } from "../../../../store/hooks";
import {
  asyncSavePokemon,
  asyncUpdatePokemon,
} from "../../../../store/pokemonSlice";

interface PokemonAddorModifyPanelProps {
  togglePanelFn: () => void;
  pokemonToUpdate?: Pokemon;
}

function PokemonAddorModifyPanel({
  togglePanelFn,
  pokemonToUpdate,
}: PokemonAddorModifyPanelProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [defense, setDefense] = useState("50");
  const [attack, setAttack] = useState("50");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setName(pokemonToUpdate?.name || "");
    setUrl(pokemonToUpdate?.image || "");
    setDefense(pokemonToUpdate?.defense.toString() || "50");
    setAttack(pokemonToUpdate?.attack.toString() || "50");
  }, [
    pokemonToUpdate?.attack,
    pokemonToUpdate?.defense,
    pokemonToUpdate?.id,
    pokemonToUpdate?.image,
    pokemonToUpdate?.name,
  ]);

  const isUpdateAction = useMemo(() => {
    return !!pokemonToUpdate?.id;
  }, [pokemonToUpdate?.id]);

  const onClosePanel = () => {
    setName("");
    setUrl("");
    togglePanelFn();
  };

  const onSubmit = (e: SyntheticEvent) => {
    //if pokemon exist type hp and author is override, else set default values
    const pokemon: Pokemon = {
      type: "undefined",
      hp: 100,
      id_author: 1,
      ...(pokemonToUpdate || {}),
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
