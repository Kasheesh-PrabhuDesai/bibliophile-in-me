import { Book } from "../utils";

interface bookSearchAPI {
  page: Number;
  query: String;
}

const bookSearchBaseAPI = "https://openlibrary.org/search.json?q=";
const searchFields = "key,cover_i,title,subtitle,author_name,name,description";

export const bookSearch = async ({ page, query }: bookSearchAPI) => {
  try {
    const response = await fetch(
      `${bookSearchBaseAPI}${query}&fields=${searchFields}&mode=everything&limit=20&page=${page}`
    );
    if (response.status !== 200) throw Error("Internal server error");
    const books = await response.json();
    return {
      books: books.docs as Book[],
      total: books.numFound,
      success: true,
      errorMsg: null,
    };
  } catch (err) {
    return {
      errorMsg: err as string,
      total: -1,
      success: false,
      books: [] as Book[],
    };
  }
};
