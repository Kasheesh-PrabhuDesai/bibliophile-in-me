import { createSelector } from "@reduxjs/toolkit";
import ReduxState from "../models";

const getBookSearchResultObj = (state: ReduxState) => state.bookSearchResult;
export const getAllBooks = createSelector(
  getBookSearchResultObj,
  re => re.books
);
export const getBooksRange = createSelector(
  getBookSearchResultObj,
  re => re.booksByRange
);

export const getActiveRange = createSelector(
  getBookSearchResultObj,
  re => re.activeRange
);

export const getLoadingType = createSelector(
  getBookSearchResultObj,
  re => re.type
);

export const getTotalBooks = createSelector(
  getBookSearchResultObj,
  re => re.total
);

export const getActiveQuery = createSelector(
  getBookSearchResultObj,
  re => re.activeQuery
);

export const getActivePage = createSelector(
  getBookSearchResultObj,
  re => re.activePage
);

export const getSelectedBook = createSelector(
  getBookSearchResultObj,
  re => re.selectedBook
);

export const getLoadingState = createSelector(
  getBookSearchResultObj,
  re => re.type
);
