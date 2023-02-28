import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import BookDetailsPage from "../pages/BookDetailsPage";
import { initStore } from "../store";
import {
  $fetchBooksBySearchQuery,
  $fetchSelectedBookDetails,
} from "../store/thunks/book-search-result.thunk";

const store = initStore();

describe("Book Details Page tests", () => {
  it("Renders selected book details", async () => {
    await store.dispatch($fetchBooksBySearchQuery({ page: 1, query: "hey" }));
    const randomSelectedBookIndex = Math.floor(Math.random() * 19);
    const randomSelectedBook =
      store.getState().bookSearchResult.booksByRange[randomSelectedBookIndex];
    const randomSelectedBookDetails = {
      key: randomSelectedBook.key,
      authorName: randomSelectedBook.author_name,
      coverImage: randomSelectedBook.cover_i,
    };
    await store.dispatch(
      $fetchSelectedBookDetails({ ...randomSelectedBookDetails })
    );
    render(
      <Router location={"/book-search-results"} navigator={undefined}>
        <Provider store={store}>
          <BookDetailsPage />
        </Provider>
      </Router>
    );
    const img = screen.queryByRole("img");
    const title = screen.queryByRole("title");
    const author = screen.queryByRole("author-name");
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
