import { BookDetails } from "./../../utils/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, Range } from "../../utils";
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
        range: Range;
        booksByRange: Book[];
      }>
    ) => {
      // we need to sort in this users according to the range
      const [from, to] = action.payload.range;
      // make sure state.users is at least **to** long
      if (state.booksByRange.length < to) {
        state.booksByRange = state.booksByRange.concat(
          Array(to - state.booksByRange.length).fill(undefined)
        );
      }
      // and then splice the new values into it
      // @ts-ignore
      state.booksByRange.splice(
        from,
        to - from,
        ...action.payload.booksByRange
      );
      // and set the active range
      state.activeRange = action.payload.range;
      state.type = "loaded";
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
