import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../shared_types/book";
import { Author } from "../shared_types/author";
import { AddOrEditPanelOption } from "../shared_types/add_or_edit";

export interface AddOrEditPanelParams {
  selectedBook?: Book;
  selectedAuthor?: Author;
  panelOption: AddOrEditPanelOption;
}

const initialState: AddOrEditPanelParams = {
  panelOption: "none",
};

export const addorEditPanelSlice = createSlice({
  name: "pokemonPanel",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<Book>) => {
      return { ...state, panelOption: "book", selectedBook: action.payload };
    },

    togglePanel: (state, action: PayloadAction<AddOrEditPanelParams>) => {
      return state.panelOption === "none" ? action.payload : initialState;
    },

    clearPanelData: () => {
      return initialState;
    },
  },
});

export default addorEditPanelSlice.reducer;
