import { bookSearch, fetchBookDetails } from "./../../services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setType,
  setTotal,
  setBooksByRange,
  setActivePage,
  setActiveQuery,
  setSelectedBook,
  setErrorMsg,
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
          booksByRange: books,
        })
      );
      thunkAPI.dispatch(setTotal(total));
      thunkAPI.dispatch(setActivePage(page));
      thunkAPI.dispatch(setActiveQuery(query));
      thunkAPI.dispatch(setType("loaded"));
    } catch (err) {
      thunkAPI.dispatch(setType("error"));
      thunkAPI.dispatch(
        setErrorMsg(`No books could be found matching ${query}. Try again!`)
      );
    }
  }
);

interface SelectedBookDetails {
  key: string;
  authorName: Array<string>;
  coverImage: string;
}

export const $fetchSelectedBookDetails = createAsyncThunk(
  "book-search-result/$fetchSelectedBookDetails",
  async ({ key, authorName, coverImage }: SelectedBookDetails, thunkAPI) => {
    thunkAPI.dispatch(setType("loading"));
    try {
      const response = await fetchBookDetails(key);
      const { bookDetails } = response;
      thunkAPI.dispatch(
        setSelectedBook({
          ...bookDetails,
          author_name: authorName,
          cover_i: coverImage,
        })
      );
      thunkAPI.dispatch(setType("loaded"));
    } catch (err) {
      thunkAPI.dispatch(setType("error"));
      thunkAPI.dispatch(
        setErrorMsg("Something went wrong. Try reloading the page!")
      );
    }
  }
);
