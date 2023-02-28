import { BookDetails } from "../utils";

const bookSearchBaseAPI = "https://openlibrary.org";

export const fetchBookDetails = async (key: string) => {
  try {
    const response = await fetch(`${bookSearchBaseAPI}${key}.json`);
    if (response.status !== 200) throw Error("Internal server error");
    const bookDetails = await response.json();
    return {
      bookDetails: bookDetails as BookDetails,
      errorMsg: null,
    };
  } catch (err) {
    throw err;
  }
};
