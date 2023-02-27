import {
  BookSearchResultState,
  initialBookSearchResultState,
} from "./book-search-result.state";
export default interface ReduxState {
  bookSearchResult: BookSearchResultState;
}

export const initialReduxState: ReduxState = {
  bookSearchResult: initialBookSearchResultState,
};
