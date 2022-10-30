import renderWithProviders from "../utils/reduxHelper";
import { basicStore } from "../store/testStore";
import { bookListAnswer } from "../mock/book.handlers";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import AddOrEditPanel from "./AddOrEditPanel";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changeInputValue,
  clickOnText,
  getInputByTextLabel,
} from "../utils/do";

const expectDummy = () => {
  expect(false).toBe(true);
};

/*
este es el componente más complejo, de acuerdo a los valores en panelOption "book"|"author"|"none" determina
el formulario a mostrar, también observa si hay algo guardado en selectedBook|selectedAuthor
en caso de haber algo guardado alli se intuye que se quiere editar y no crear algo nuevo

estos tests validan tanto el renderizado correcto del formulario como la lógica
 */
describe("for add/edit panel", () => {
  describe("for books", () => {
    describe("for edit", () => {
      const StoreForEdit = { ...basicStore };

      // lo ideal sería hacer let testStore: <type> y asi poder
      // asignarle el valor dentro de beforeEach y usarla luego en los tests
      // pero el tipo de testStore es bastante complejo para colocarlo explícitamente
      let testStore = configureStore(StoreForEdit);

      beforeEach(() => {
        StoreForEdit.preloadedState.panel.panelOption = "book";
        StoreForEdit.preloadedState.panel.selectedBook =
          bookListAnswer.books[0];
        testStore = configureStore(StoreForEdit);

        renderWithProviders(
          <Router>
            <AddOrEditPanel />{" "}
          </Router>,
          testStore
        );
      });

      it("EDIT: must show edit book and not author when you edit", async () => {
        const bookFields = screen.queryByText(/Edit Book/);
        const authorFields = screen.queryByText(/Author details/);

        expect(bookFields).toBeInTheDocument();
        expect(authorFields).not.toBeInTheDocument();
      });

      it("EDIT: if edit correctly must do API request an store locally", async () => {
        const inputName = await screen.findByLabelText(/Book Name/);
        const inputISBN = await screen.findByLabelText(/Book ISBN/);
        const saveButton = await screen.findByText(/Save/);

        expect(inputName).toBeInTheDocument();
        expect(inputISBN).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        fireEvent.change(inputName, {
          target: {
            value: "testing with react",
          },
        });

        fireEvent.change(inputISBN, {
          target: {
            value: "qwerty22",
          },
        });

        fireEvent.click(saveButton);

        await waitFor(() => {
          expect(
            testStore
              .getState()
              .book.books.filter((b) => b.title === "testing with react").length
          ).toEqual(1);
        });
      });
    });

    describe("for create", () => {
      const StoreForEdit = { ...basicStore };
      let testStore = configureStore(StoreForEdit);

      beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(toast, "info");

        StoreForEdit.preloadedState.panel.panelOption = "book";
        StoreForEdit.preloadedState.panel.selectedBook = undefined;
        StoreForEdit.preloadedState.panel.selectedAuthor = undefined;
        testStore = configureStore(StoreForEdit);
        renderWithProviders(
          <Router>
            <AddOrEditPanel />{" "}
          </Router>,
          testStore
        );
      });

      it("CREATE: must show add book and add author panels when you want create a new book", () => {
        const bookPanel = screen.queryByText(/Book details/);
        const authorPanel = screen.queryByText(/Author details/);

        expect(bookPanel).toBeInTheDocument();
        expect(authorPanel).toBeInTheDocument();
      });

      it("CREATE: if you don't fill all fields correctly show error as toast info", async () => {
        const inputName = await screen.findByLabelText(/Book Name/);
        const saveButton = await screen.findByText(/Save/);

        fireEvent.change(inputName, {
          target: {
            value: "testing with react",
          },
        });

        fireEvent.click(saveButton);

        expect(toast.info).toBeCalledTimes(1);
      });

      it("CREATE: if you fill correctly all fields author", async () => {
        const inputName = await getInputByTextLabel(/Book Name/);
        const inputISBN = await getInputByTextLabel(/Book ISBN/);
        const authorName = await getInputByTextLabel(/Author Name/);
        const authorLastName = await getInputByTextLabel(/Author Lastname/);

        expect(inputName).toBeInTheDocument();
        expect(inputISBN).toBeInTheDocument();
        expect(authorName).toBeInTheDocument();
        expect(authorLastName).toBeInTheDocument();

        changeInputValue(inputName, "testing with react");
        changeInputValue(inputISBN, "qwerty22");
        changeInputValue(authorName, "tom");
        changeInputValue(authorLastName, "alan");

        await clickOnText(/Save/);

        await waitFor(() => {
          expect(
            testStore.getState().book.books.filter((b) => {
              return (
                b.title === "testing with react" &&
                b?.author?.firstname === "tom" &&
                b?.author?.lastname === "alan" &&
                b.isbn === "qwerty22"
              );
            }).length
          ).toEqual(1);
        });
      });
    });
  });

  describe("for author", () => {
    const StoreForEdit = { ...basicStore };

    let testStore = configureStore(StoreForEdit);

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(toast, "info");
      StoreForEdit.preloadedState.panel.panelOption = "author";
      testStore = configureStore(StoreForEdit);

      renderWithProviders(
        <Router>
          <AddOrEditPanel />{" "}
        </Router>,
        testStore
      );
    });

    it("must show only author when you try create", () => {
      const bookPanel = screen.queryByText(/Book details/);
      const authorPanel = screen.queryByText(/Author details/);

      expect(bookPanel).not.toBeInTheDocument();
      expect(authorPanel).toBeInTheDocument();
    });

    it("CREATE must show error as a toast.info if all field were no filled", async () => {
      const authorName = await getInputByTextLabel(/Author Name/);
      changeInputValue(authorName, "tom");

      await clickOnText(/Save/);
      expect(toast.info).toBeCalledTimes(1);
    });

    it("CREATE must add author if all fields were filled correctly", async () => {
      const authorName = await getInputByTextLabel(/Author Name/);
      changeInputValue(authorName, "aaa");

      const authorLastName = await getInputByTextLabel(/Author Lastname/);
      changeInputValue(authorLastName, "zzz");

      await clickOnText(/Save/);

      await waitFor(() => {
        const authors = testStore.getState().author.authors;
        expect(
          authors.filter((a) => {
            return a.firstname === "aaa" && a.lastname === "zzz";
          }).length
        ).toEqual(1);
      });
    });
  });
});
