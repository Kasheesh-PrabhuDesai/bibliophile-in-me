import { BookDetails } from "./../../utils/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../utils";
import { initialReduxState } from "../models";

export const bookSearchResultSlice = createSlice({
  name: "bookSearchResult",
  initialState: initialReduxState.bookSearchResult,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      // @ts-ignore
      state.books = action.payload;
      return state;
    },
    setType: (
      state,
      action: PayloadAction<typeof initialReduxState.bookSearchResult["type"]>
    ) => void (state.type = action.payload),
    setTotal: (
      state,
      action: PayloadAction<typeof initialReduxState.bookSearchResult["total"]>
    ) => void (state.total = action.payload),
    setBooksByRange: (
      state,
      action: PayloadAction<{
        booksByRange: Book[];
      }>
    ) => {
      state.booksByRange = [...action.payload.booksByRange];
    },
    setActivePage: (
      state,
      action: PayloadAction<
        typeof initialReduxState.bookSearchResult["activePage"]
      >
    ) => void (state.activePage = action.payload),
    setActiveQuery: (
      state,
      action: PayloadAction<
        typeof initialReduxState.bookSearchResult["activeQuery"]
      >
    ) => void (state.activeQuery = action.payload),
    setSelectedBook: (state, action: PayloadAction<BookDetails>) => {
      state.selectedBook = action.payload;
    },
    setErrorMsg: (
      state,
      action: PayloadAction<
        typeof initialReduxState.bookSearchResult["errorMsg"]
      >
    ) => {
      state.errorMsg = action.payload;
    },
  },
});

export const {
  setType,
  setTotal,
  setBooks,
  setBooksByRange,
  setActivePage,
  setActiveQuery,
  setSelectedBook,
  setErrorMsg,
} = bookSearchResultSlice.actions;
export default bookSearchResultSlice.reducer;
