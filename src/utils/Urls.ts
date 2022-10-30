import { API_URL } from "./Axios";

export const getBooksURL = `${API_URL}/books`;
export const postBooksURL = `${API_URL}/book`;
export const getBookByIDURL = (id: number) => `${API_URL}/book/${id}`;
export const putBookByIDURL = getBookByIDURL;
export const deleteBookByIDURL = getBookByIDURL;
