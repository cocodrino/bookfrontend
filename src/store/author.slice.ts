import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Axios } from "../utils/Axios";
import { toast } from "react-toastify";
import {
  Author,
  AuthorsResponse,
  DeleteAuthorResponse,
  PostAuthorResponse,
  PutAuthorResponse,
} from "../shared_types/author";
import { addorEditPanelSlice } from "./add_or_edit_panel.slice";

export interface AuthorState {
  authors: Author[];
}

const initialState: AuthorState = {
  authors: [],
};

export const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    loadAuthor: (state, action: PayloadAction<Author[]>) => {
      return { authors: action.payload };
    },

    addAuthor: (state, action: PayloadAction<Author>) => {
      // Redux Toolkit usa Immer, que detecta cambios en el estado y produce un nuevo estado
      // inmutable, personalmente casi nunca lo uso, pero coloco el ejemplo
      state.authors.push(action.payload);
    },
    removeAuthor: (state, action: PayloadAction<Author>) => {
      return {
        authors: state.authors.filter(
          (author) => author.id !== action.payload.id
        ),
      };
    },
    updateAuthor: (state, action: PayloadAction<Author>) => {
      return {
        authors: state.authors.map((author) => {
          if (author.id === action.payload.id) return action.payload;
          return author;
        }),
      };
    },

    deleteAuthor: (state, action: PayloadAction<Author>) => {
      return {
        authors: state.authors.filter(
          (author) => author.id !== action.payload.id
        ),
      };
    },
  },
});

export const asyncLoadAuthors = () => async (dispatch: AppDispatch) => {
  toast.info("LOADING AUTHORS....", { toastId: 100 });
  const result: AuthorsResponse = await Axios.get("/authors");

  toast.update(100, {
    render: "Authors loaded",
    type: toast.TYPE.SUCCESS,
    autoClose: 1000,
  });
  dispatch(authorSlice.actions.loadAuthor(result.data.authors));
};

export const asyncSaveAuthor =
  (author: Author) => async (dispatch: AppDispatch) => {
    try {
      const response: PostAuthorResponse = await Axios.post("/author", author);

      if (response.status == 201 && response.data.author) {
        dispatch(authorSlice.actions.addAuthor(response.data.author));
        toast("author  saved");
        dispatch(addorEditPanelSlice.actions.clearPanelData());
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      console.error(`error saving author ${e}`);
    }
  };

export const asyncUpdateAuthor =
  (author: Partial<Author>) => async (dispatch: AppDispatch) => {
    if (!author.id) {
      console.error(`you need the id in order to update author ${author}`);
      return;
    }
    try {
      const authorReq = { ...author };
      delete authorReq.id;
      const response: PutAuthorResponse = await Axios.put(
        `/author/${author.id}`,
        authorReq
      );

      if (response.status == 200 && response.data.author) {
        dispatch(authorSlice.actions.updateAuthor(response.data.author));
        toast("author updated");
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
      console.error(`error saving author ${e}`);
    }
  };

export const asyncDeleteAuthor =
  (id?: number) => async (dispatch: AppDispatch) => {
    if (!id) {
      console.error(`you need the id in order to delete author`);
      return;
    }
    try {
      toast.info("deleting author...");
      const response: DeleteAuthorResponse = await Axios.delete(
        `/author/${id}`
      );

      if (response.status == 200) {
        dispatch(authorSlice.actions.deleteAuthor(response.data.author));
      } else {
        toast.error("Error. Please try again");
        console.error(
          `unexpected response ${response.status} / ${response.data}`
        );
      }
    } catch (e) {
      toast.error("Error. Please try again");
      console.error(`error deleting author ${e}`);
    }
  };

export default authorSlice.reducer;
