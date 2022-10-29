import { Author } from "./author";
import { AxiosResponse } from "axios";

export interface Book {
  id?: number;
  title: string;
  isbn: string;

  authorId?: number;
  author?: Author;
}

export type BooksResponse = AxiosResponse<{ books: Book[] }>;
export type PostBookResponse = AxiosResponse<{ book: Book }>;
export type GetBookResponse = AxiosResponse<{ book: Book }>;
export type PutBookResponse = AxiosResponse<{ book: Book }>;
export type DeleteBookResponse = AxiosResponse<{ book: Book }>;
