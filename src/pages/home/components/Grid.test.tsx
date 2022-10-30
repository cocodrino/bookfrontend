import {  render, screen } from "@testing-library/react";
import { Grid } from "./Grid";
import { bookListAnswer } from "../../../mock/book.handlers";
import { BrowserRouter as Router } from "react-router-dom";

describe("for Grid", () => {
  const books = bookListAnswer.books;

  render(
    <Router>
      <Grid books={books} />
    </Router>
  );

  it("must render every book passed", async () => {
    const bookDisplayed = await screen.findAllByRole("cell-grid");

    expect(bookDisplayed.length).toEqual(15);
  });
});
