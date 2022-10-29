import renderWithProviders from "../../../utils/reduxHelper";
import testStore from "../../../store/testStore";
import { AuthorList } from "./AuthorList";
import { authorListAnswer } from "../../../mock/author.handlers";
import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("for author list", () => {
  beforeEach(() => {
    renderWithProviders(
      <AuthorList authors={authorListAnswer.authors} />,
      testStore
    );
  });

  it("must show list of authors", async () => {
    const displayedAuthors = await screen.findAllByRole("author_row");
    expect(displayedAuthors.length).toEqual(13);
  });

  it(
    "when delete author must execute request and change local state",
    async () => {
      const displayedDeleteButtons = await screen.findAllByRole(
        "author_delete"
      );

      fireEvent.click(displayedDeleteButtons[0]);

      await waitFor(
        () => {
          expect(testStore.getState().author.authors.length).toEqual(12);
        },
        { timeout: 10 * 1000 }
      );
    },
    15 * 1000
  );
});
