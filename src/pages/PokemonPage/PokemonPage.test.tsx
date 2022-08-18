import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PokemonPage from "./PokemonPage";
import { configureStore } from "@reduxjs/toolkit";
import pokemonPanelReducer from "../../store/pokemonPanelSlice";
import renderWithProviders from "../../utils/reduxHelper";
import pokemonReducer from "../../store/pokemonSlice";

const newPanelStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonPanel: pokemonPanelReducer,
  },
  preloadedState: {
    pokemonPanel: {
      showPanel: false,
      selectedPokemon: undefined,
    },
  },
});

describe("when load Pokemons", () => {
  it("display correctly existing pokemons", async () => {
    renderWithProviders(<PokemonPage />, newPanelStore);
    const displayedPokemons = await screen.findAllByRole("pokemon_row");

    //because API is mocked I can be sure that this always will be this value
    expect(displayedPokemons.length).toEqual(5);
  });

  it("when type in the search filters must only display matching results", async () => {
    renderWithProviders(<PokemonPage />, newPanelStore);

    const pokemonSearch = screen.getByTestId("pokemon_search");
    expect(pokemonSearch).toBeInTheDocument();

    fireEvent.change(pokemonSearch, {
      target: { value: "t4est" },
    });

    const displayedPokemons = await screen.findAllByRole("pokemon_row");

    //because API is mocked I can be sure that this always will be this value
    expect(displayedPokemons.length).toEqual(1);
  });
});

describe("when update pokemon", () => {});
