import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import PokemonPage from "./PokemonPage";
import renderWithProviders from "../../utils/reduxHelper";
import testStore from "../../store/testStore";

describe("when load Pokemons", () => {
  beforeEach(() => {
    renderWithProviders(<PokemonPage />, testStore);
  });

  it("when type in the search filters must only display matching results", async () => {
    const pokemonSearch = screen.getByTestId("pokemon_search");
    expect(pokemonSearch).toBeInTheDocument();

    fireEvent.change(pokemonSearch, {
      target: { value: "t4est" },
    });

    const displayedPokemons = await screen.findAllByRole("pokemon_row");

    //because API is mocked I can be sure that this always will be this value
    expect(displayedPokemons.length).toEqual(1);
  });

  it("when click add, panel to add must be show", async () => {
    await waitFor(() => {
      const button = screen.getByTestId("add_pokemon_button");
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      const addPanel = screen.queryAllByText(/Nuevo Pokemon/);
      expect(addPanel).toHaveLength(1);

      fireEvent.click(button);
      const addPanelNone = screen.queryAllByText(/Nuevo Pokemon/);
      expect(addPanelNone).toHaveLength(0);
    });
  });

  it("add pokemon must add to the list", async () => {
    const button = screen.getByTestId("add_pokemon_button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      const addPanel = screen.queryAllByText(/Nuevo Pokemon/);
      expect(addPanel).toHaveLength(1);
    });

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "pokelele" },
    });

    fireEvent.change(screen.getByTestId("image"), {
      target: { value: "https://assets.pokemon.com/assets/pokelele.png" },
    });

    fireEvent.click(await screen.findByRole("save_pokemon"));

    await waitFor(async () => {
      const displayedPokemons = await screen.findAllByRole("pokemon_row");
      expect(displayedPokemons).toHaveLength(6);
    });

    await waitFor(() => {
      const pokemonNamesElement = screen.getAllByRole("pokemon_row_name");
      const pokemonsNames = pokemonNamesElement.map((v) => v.textContent);

      expect(pokemonsNames.find((name) => name === "pokelele")).not.toBe(
        undefined
      );
    });
  });

  it("delete a pokemon must remove from list", async () => {
    const displayedDeleteButtons = await screen.findAllByRole(
      "pokemon_row_delete_pokemon"
    );

    fireEvent.click(displayedDeleteButtons[0]);

    await waitFor(async () => {
      const displayedPokemons = await screen.findAllByRole("pokemon_row");
      expect(displayedPokemons).toHaveLength(4);
    });
  });

  it("edit pokemon must change this in the list", async () => {
    const displayedModifyButtons = await screen.findAllByRole(
      "pokemon_row_set_selected_pokemon"
    );

    fireEvent.click(displayedModifyButtons[0]);

    const addPanelNone = screen.queryAllByText(/Modificar Pokemon/);
    expect(addPanelNone).toHaveLength(1);

    const nameInput = screen.getByTestId("name");
    expect(nameInput).toBeInTheDocument();

    const originalName = nameInput.textContent;

    fireEvent.change(nameInput, { target: { value: "charizardo" } });

    const imageInput = screen.getByTestId("image");
    expect(imageInput).toHaveValue();

    fireEvent.change(imageInput, {
      target: { value: "https://assets.pokemon.com/assets/charizardo.png" },
    });

    fireEvent.click(await screen.findByRole("save_pokemon"));

    await waitFor(() => {
      const pokemonNamesElement = screen.getAllByRole("pokemon_row_name");
      const pokemonsNames = pokemonNamesElement.map((v) => v.textContent);

      expect(pokemonsNames.find((name) => name === "charizardo")).not.toBe(
        undefined
      );

      expect(pokemonsNames.find((name) => name === originalName)).toBe(
        undefined
      );
    });
  });
});
