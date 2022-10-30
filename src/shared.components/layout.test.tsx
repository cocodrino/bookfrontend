import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./layout";
import renderWithProviders from "../utils/reduxHelper";
import testStore from "../store/testStore";

describe("for layout", () => {
  describe("for home", () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Layout />
      </MemoryRouter>,
      testStore
    );

    it("must display button to add book", () => {
      const button = screen.queryByText("Add New Book");
      const buttonAuthor = screen.queryByText("Add new Author");

      expect(button).toBeInTheDocument();
      expect(buttonAuthor).not.toBeInTheDocument();
    });
  });


});
