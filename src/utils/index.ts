export type Book = {
  key: string;
  title: string;
  cover_i: string;
  author_name: Array<string>;
};

export type BookList = {
  Books: Book[];
};

export type Range = [from: number, to: number];

export type BookDetails = {
  title: string;
  key: string;
  author_name: Array<string>;
  authors: [{ author: { key: string }; type: { key: string } }];
  type: { key: string };
  description: { type: string; value: string };
  covers: Array<number>;
  subject_places: Array<string>;
  subjects: Array<string>;
  subject_people: Array<string>;
  created: { type: string; value: string };
  last_modified: { type: string; value: string };
};

export enum Page {
  HOME = "home",
  SEARCH_RESULTS = "book-search-results",
  BOOK_DETAILS = "book-details",
}
