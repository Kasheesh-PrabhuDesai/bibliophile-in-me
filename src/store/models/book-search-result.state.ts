import { Book, BookDetails, Range } from "../../utils";

export type BookSearchResultState = {
  books: Book[];
  booksByRange: Book[];
  type: "loaded" | "loading" | "error";
  errorMsg: string | undefined;
  total: number;
  activeRange: Range | undefined;
  activePage: number;
  activeQuery: string;
  selectedBook: BookDetails;
};

export const initialBookSearchResultState = {
  books: [] as Book[],
  booksByRange: [] as Book[],
  type: "loading" as "loaded" | "loading" | "error",
  total: -1,
  activeRange: undefined as Range | undefined,
  errorMsg: undefined as string | undefined,
  activePage: 1,
  activeQuery: "",
  selectedBook: {} as BookDetails,
};
