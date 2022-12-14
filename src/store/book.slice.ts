import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Axios } from "../utils/Axios";
import { toast } from "react-toastify";
import {
  Book,
  BooksResponse,
  DeleteBookResponse,
  PostBookResponse,
  PutBookResponse,
} from "../shared_types/book";
import { addorEditPanelSlice } from "./add_or_edit_panel.slice";

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadBook: (state, action: PayloadAction<Book[]>) => {
      return { books: action.payload };
    },

    addBook: (state, action: PayloadAction<Book>) => {
      // Redux Toolkit usa Immer, que detecta cambios en el estado y produce un nuevo estado
      // inmutable, personalmente casi nunca lo uso, pero coloco el ejemplo
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<Book>) => {
      return {
        books: state.books.filter((book) => book.id !== action.payload.id),
      };
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      return {
        books: state.books.map((book) => {
          if (book.id === action.payload.id) return action.payload;
          return book;
        }),
      };
    },

    deleteBook: (state, action: PayloadAction<Book>) => {
      return {
        books: state.books.filter((book) => book.isbn !== action.payload.isbn),
      };
    },
  },
});

export const asyncLoadBooks = () => async (dispatch: AppDispatch) => {
  toast.info("LOADING BOOKS....", { toastId: 100 });
  const result: BooksResponse = await Axios.get("/books");

  toast.update(100, {
    render: "Books loaded",
    type: toast.TYPE.SUCCESS,
    autoClose: 1000,
  });
  dispatch(bookSlice.actions.loadBook(result.data.books));
};

export const asyncSaveBook = (book: Book) => async (dispatch: AppDispatch) => {
  try {
    const response: PostBookResponse = await Axios.post("/book", book);

    if (response.status == 201 && response.data.book) {
      dispatch(
        bookSlice.actions.addBook({
          ...response.data.book,
          author: book.author,
        })
      );
      toast("book  saved");
      dispatch(addorEditPanelSlice.actions.clearPanelData());
    } else {
      toast.error("Error. Please try again");
      console.error(
        `unexpected response ${response.status} / ${response.data}`
      );
    }
  } catch (e) {
    console.error(`error saving book ${e}`);
  }
};

export const asyncUpdateBook =
  (book: Partial<Book>, navigate: (to: string) => void) =>
  async (dispatch: AppDispatch) => {
    if (!book.id) {
      console.error(`you need the id in order to update book ${book}`);
      return;
    }

    const bookReq = { ...book };

    delete bookReq.id;
    delete bookReq.authorId;
    delete bookReq.author;

    try {
      const response: PutBookResponse = await Axios.put(
        `/book/${book.id}`,
        bookReq
      );

      if (response.status == 200 && response.data.book) {
        //join book with response in order to keep the authors because the put endpoint dont send
        //you the authors
        dispatch(
          bookSlice.actions.updateBook({ ...book, ...response.data.book })
        );
        toast("book updated");
        navigate("/");

        setTimeout(() => {
          dispatch(addorEditPanelSlice.actions.clearPanelData());
        }, 2000);
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      console.error(`error saving book ${e}`);
    }
  };

export const asyncDeleteBook =
  (id: number, navigate: (to: string) => void) =>
  async (dispatch: AppDispatch) => {
    if (!id) {
      console.error(`you need the id in order to delete book`);
      return;
    }
    try {
      const response: DeleteBookResponse = await Axios.delete(`/book/${id}`);

      if (response.status == 200) {
        dispatch(bookSlice.actions.deleteBook(response.data.book));
        toast.success("book correctly deleted");
        navigate("/");
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      toast.error("Error. Please try again");
      console.error(`error saving book ${e}`);
    }
  };

export default bookSlice.reducer;
