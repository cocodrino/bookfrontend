import { fireEvent, render, screen } from "@testing-library/react";
import { BookDetailContent } from "./BookDetailContent";
import { bookListAnswer } from "../../mock/book.handlers";

describe("in book details", () => {
  const editMock = jest.fn();
  const deleteMock = jest.fn();

  beforeEach(() => {
    const book = bookListAnswer.books[0];
    render(
      <BookDetailContent
        book={book}
        onEditBook={editMock}
        onDelete={deleteMock}
      />
    );
  });

  it("when clicked remove must execute delete call", async () => {
    const deleteButton = await screen.findAllByText("Delete Book");
    fireEvent.click(deleteButton[0]);

    expect(deleteMock.mock.calls.length).toBe(1);
  });

  it("when clicked edit must execute edit callback", async () => {
    const editButton = await screen.findAllByText(/Edit Book/);
    fireEvent.click(editButton[0]);

    expect(editMock.mock.calls.length).toBe(1);
  });
});
