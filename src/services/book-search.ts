import { Book } from "../utils";

interface bookSearchAPI {
  page: Number;
  query: String;
}

const bookSearchBaseAPI = "https://openlibrary.org/search.json?q=";
const searchFields = "key,cover_i,title,subtitle,author_name,name";

export const bookSearch = async ({ page, query }: bookSearchAPI) => {
  try {
    const response = await fetch(
      `${bookSearchBaseAPI}${query}&fields=${searchFields}&mode=everything&limit=20&page=${page}`
    );
    if (response.status !== 200) throw Error("Internal Server Error");
    const books = await response.json();
    if (books.numFound === 0) throw Error("No books could be found"); // display error if no books found
    return {
      books: books.docs as Book[],
      total: books.numFound,
      success: true,
      errorMsg: null,
    };
  } catch (err) {
    throw err;
  }
};
