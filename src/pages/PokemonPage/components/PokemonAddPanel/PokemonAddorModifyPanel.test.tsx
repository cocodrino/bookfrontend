import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PokemonAddorModifyPanel from "./PokemonAddorModifyPanel";

const onTogglePanel = jest.fn();

describe("Component Add PokemonPage Panel", () => {
  render(<PokemonAddorModifyPanel togglePanelFn={onTogglePanel} />);
  it("display correctly", async () => {
    const displayedParameters = await screen.findAllByRole(
      "pokemon_add_panel_parameter"
    );
    expect(displayedParameters.length).toEqual(4);
  });

  it("button submit is disable by default", () => {
    expect(screen.getByRole("save_pokemon")).toHaveAttribute("disabled");
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

    fireEvent.click(screen.getByRole("save_pokemon"));
    expect(onTogglePanel.call.length).toBe(1);
  });
});
