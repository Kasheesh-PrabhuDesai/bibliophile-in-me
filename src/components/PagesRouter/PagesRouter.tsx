import { Route, Routes } from "react-router-dom";
import BookDetailsPage from "../../pages/BookDetailsPage";
import HomePage from "../../pages/HomePage";
import SearchResultsPage from "../../pages/SearchResultsPage";

export default function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book-search-results" element={<SearchResultsPage />} />
      <Route path="/book-details" element={<BookDetailsPage />} />
    </Routes>
  );
}
