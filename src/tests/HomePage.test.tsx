import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { initStore } from "../store";

const store = initStore();

describe("Home page tests", () => {
  it("Renders search bar on home page", async () => {
    render(
      <Router location={"/"} navigator={undefined}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Router>
    );
    const searchBar = screen.queryByRole("searchbox");
    const searchButton = screen.queryByRole("button");
    expect(searchButton).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });
});
