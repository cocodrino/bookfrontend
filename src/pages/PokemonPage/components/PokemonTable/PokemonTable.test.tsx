import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import testStore from "../../../../store/testStore";
import renderWithProviders from "../../../../utils/reduxHelper";
import PokemonTable from "./PokemonTable";
import { pokemonListAnswer } from "../../../../mock/handlers";

describe("when load Pokemons", () => {
  beforeEach(() => {
    renderWithProviders(
      <PokemonTable pokemons={pokemonListAnswer} />,
      testStore
    );
  });

  it("display correctly existing pokemons", async () => {
    const displayedPokemons = await screen.findAllByRole("pokemon_row");

    expect(displayedPokemons.length).toEqual(5);
  });

  it("when click edit this must change edit state to that pokemon and panel auto activate", async () => {
    const displayedModifyButtons = await screen.findAllByRole(
      "pokemon_row_set_selected_pokemon"
    );

    expect(displayedModifyButtons.length).toEqual(5);

    fireEvent.click(displayedModifyButtons[0]);

    const store = testStore.getState().pokemonPanel;
    expect(store?.selectedPokemon?.name).toEqual("charizardss");
    expect(store?.showPanel).toBe(true);
  });

  it("when click delete must call action to delete", async () => {
    const deleteButtons = await screen.findAllByRole(
      "pokemon_row_delete_pokemon"
    );

    expect(deleteButtons.length).toEqual(5);
    expect(testStore.getState().pokemon.pokemons.length).toEqual(5);

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(testStore.getState().pokemon.pokemons.length).toEqual(4);
    });
  });
});
