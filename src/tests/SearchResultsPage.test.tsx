import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import SearchResultsPage from "../pages/SearchResultsPage";
import { initStore } from "../store";
import { $fetchBooksBySearchQuery } from "../store/thunks/book-search-result.thunk";

const store = initStore();

describe("Search Results Page tests", () => {
  it("Renders search results card", async () => {
    await store.dispatch($fetchBooksBySearchQuery({ page: 1, query: "hey" }));
    render(
      <Router location={"/book-search-results"} navigator={undefined}>
        <Provider store={store}>
          <SearchResultsPage />
        </Provider>
      </Router>
    );
    const buttons = screen.queryAllByRole("button");
    const images = screen.queryAllByRole("img");
    const bookResults = screen.queryAllByRole("book-result"); // 20 cards should be rendered
    expect(bookResults.length).toBe(20);
    expect(images.length).toBe(20);
    expect(buttons.length).toBe(24); //20 card buttons + 2 extra buttons for pagination + 2 buttons for navigation
  });
});
