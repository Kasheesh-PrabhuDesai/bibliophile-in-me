import { bookSearch, fetchBookDetails } from "./../../services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setType,
  setTotal,
  setBooksByRange,
  setActivePage,
  setActiveQuery,
  setSelectedBook,
} from "../slices/book-search-result.slice";

interface FetchBooks {
  query: string;
  page: number;
}

export const $fetchBooksBySearchQuery = createAsyncThunk(
  "book-search-result/$fetchBooksBySearchQuery",
  async ({ query, page }: FetchBooks, thunkAPI) => {
    thunkAPI.dispatch(setType("loading"));
    try {
      const response = await bookSearch({ query, page });
      const { total, books } = response;
      thunkAPI.dispatch(
        setBooksByRange({
          range: [0, 20],
          booksByRange: books,
        })
      );
      thunkAPI.dispatch(setTotal(total));
      thunkAPI.dispatch(setActivePage(page));
      thunkAPI.dispatch(setActiveQuery(query));
      return { success: true };
    } catch (err) {
      thunkAPI.dispatch(setType("error"));
      return { success: false };
    }
  }
);

interface SelectedBookDetails {
  key: string;
  authorName: Array<string>;
}

export const $fetchSelectedBookDetails = createAsyncThunk(
  "book-search-result/$fetchSelectedBookDetails",
  async ({ key, authorName }: SelectedBookDetails, thunkAPI) => {
    try {
      const response = await fetchBookDetails(key);
      const { bookDetails } = response;
      thunkAPI.dispatch(
        setSelectedBook({ ...bookDetails, author_name: authorName })
      );
    } catch (err) {
      thunkAPI.dispatch(setType("error"));
    }
  }
);
