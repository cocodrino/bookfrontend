import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Pokemon } from "../../../../shared_types/pokemon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  asyncSavePokemon,
  asyncUpdatePokemon,
} from "../../../../store/pokemonSlice";
import { pokemonPanelSlice } from "../../../../store/pokemonPanelSlice";
import useOnClickOutside from "../../../../utils/clickOutside";

import { FiSave, FiX } from "react-icons/fi";

function PokemonAddorModifyPanel() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [defense, setDefense] = useState("50");
  const [attack, setAttack] = useState("50");
  const pokemonPanel = useAppSelector((state) => state.pokemonPanel);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

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

  useOnClickOutside(ref, () => onClosePanel());

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

  // para ocultar el valor del slider luego de moverlo
  const [showAttackValue, setShowAttackValue] = useState(false);
  const [showDefenseValue, setShowDefenseValue] = useState(false);

  return (
    <div
      className="pokemon_add_panel bg-slate-200 py-6 px-8 text-lg fixed bottom-0 right-0 w-full"
      ref={ref}
    >
      <div className="text-xl font-medium">
        {isUpdateAction ? "Modificar Pokemon" : "Nuevo Pokemon"}
      </div>
      <div className="pokemon_add_panel_parameters mt-8">
        <form onSubmit={onSubmit}>
          <div className="pokemon_add_panel_parameters_area grid grid-cols-2 mx-12">
            <div className="pokemon_add_panel_first_column">
              <div
                role="pokemon_add_panel_parameter"
                className="mb-3 grid grid-cols-[auto,1fr] justify-center items-center"
              >
                <label className="text-xl" htmlFor="Name">
                  Nombre:
                </label>
                <input
                  className="ml-4 w-1/2 border border-violet-500 px-3 py-3 rounded-lg"
                  type="text"
                  name="Name"
                  value={name}
                  data-testid="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div
                role="pokemon_add_panel_parameter"
                className="grid grid-cols-[auto,1fr] justify-center items-center"
              >
                <label className="text-xl" htmlFor="Image">
                  Imagen:
                </label>
                <input
                  className="ml-4 w-1/2 border border-violet-500 px-3 py-3 rounded-lg"
                  type="url"
                  name="Image"
                  placeholder="url"
                  value={url}
                  data-testid="image"
                  required
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="pokemon_add_panel_second_column pt-5">
              <div
                role="pokemon_add_panel_parameter"
                className="mb-3 grid grid-cols-[auto,0.5fr] justify-center items-center"
              >
                <label className="text-xl mr-4" htmlFor="Attack">
                  Ataque:
                </label>
                <div className="flex items-center">
                  <input
                    className="flex-grow"
                    type="range"
                    name="Attack"
                    min="0"
                    max="100"
                    value={attack}
                    onChange={(e) => {
                      setAttack(e.target.value);
                      setShowAttackValue(true);
                      setTimeout(() => setShowAttackValue(false), 1000);
                    }}
                  />
                  <span className="w-3 ml-3 text-violet-700 font-medium">
                    {showAttackValue && attack}
                  </span>
                </div>
              </div>

              <div
                role="pokemon_add_panel_parameter"
                className="grid grid-cols-[auto,0.5fr] justify-center items-center"
              >
                <label className="text-xl mr-3" htmlFor="Defense">
                  Defensa:
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="Defense"
                    min="0"
                    max="100"
                    value={defense}
                    onChange={(e) => {
                      setDefense(e.target.value);
                      setShowDefenseValue(true);
                      setTimeout(() => setShowDefenseValue(false), 1000);
                    }}
                  />
                  <span className="w-3 ml-3 text-violet-700 font-medium">
                    {showDefenseValue && defense}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pokemon_add_panel_buttons text-xl pt-12 flex justify-center">
            <button
              className="cursor-pointer px-5 py-4 text-xl bg-violet-700 hover:bg-violet-900 rounded text-slate-50 mx-3"
              role="save_pokemon"
              type="submit"
              disabled={name === "" || url === ""}
            >
              <FiSave className="inline" />{" "}
              <span>{isUpdateAction ? "Actualizar" : "Guardar"}</span>
            </button>
            <button
              className="cursor-pointer px-5 text-xl bg-violet-700 hover:bg-violet-900 rounded text-slate-50 mx-3"
              onClick={onClosePanel}
            >
              <FiX className="inline" /> <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PokemonAddorModifyPanel;
