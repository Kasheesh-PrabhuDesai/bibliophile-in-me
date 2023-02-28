import { Book, BookDetails } from "../../utils";

export type BookSearchResultState = {
  booksByRange: Book[];
  type: "loaded" | "loading" | "error";
  errorMsg: string | undefined;
  total: number;
  activePage: number;
  activeQuery: string;
  selectedBook: BookDetails;
};

export const initialBookSearchResultState = {
  booksByRange: [] as Book[],
  type: "loading" as "loaded" | "loading" | "error",
  total: -1,
  errorMsg: undefined as string | undefined,
  activePage: 1,
  activeQuery: "",
  selectedBook: {} as BookDetails,
};
