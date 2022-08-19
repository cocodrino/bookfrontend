import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import PokemonAddorModifyPanel from "./PokemonAddorModifyPanel";
import { configureStore } from "@reduxjs/toolkit";
import pokemonPanelReducer from "../../../../store/pokemonPanelSlice";
import renderWithProviders from "../../../../utils/reduxHelper";

const newPanelStore = configureStore({
  reducer: {
    pokemonPanel: pokemonPanelReducer,
  },
  preloadedState: {
    pokemonPanel: {
      showPanel: false,
      selectedPokemon: undefined,
    },
  },
});

describe("Component Add PokemonPage Panel", () => {
  beforeEach(() => {
    renderWithProviders(<PokemonAddorModifyPanel />, newPanelStore);
  });

  it("display correctly", async () => {
    const displayedParameters = await screen.findAllByRole(
      "pokemon_add_panel_parameter"
    );
    expect(displayedParameters.length).toEqual(4);
  });

  it("button submit is disable by default", async () => {
    await waitFor(() => {
      expect(screen.getByRole("save_pokemon")).toHaveAttribute("disabled");
    });
  });

  it("when name and url is filled button is enabled and can be clicked", () => {
    const nameInput = screen.getByTestId("name");
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(nameInput, {
      target: { value: "charmander21" },
    });

    expect(screen.getByRole("save_pokemon")).toHaveAttribute("disabled");

    const imageInput = screen.getByTestId("image");
    expect(imageInput).toBeInTheDocument();

    fireEvent.change(imageInput, {
      target: { value: "http://charmandeeer.com/image" },
    });

    expect(screen.getByRole("save_pokemon")).not.toBeDisabled();
  });
});
