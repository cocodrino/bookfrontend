import { AxiosResponse } from "axios";

export interface Author {
  id?: number;
  firstname: string;
  lastname: string;
}

export type AuthorsResponse = AxiosResponse<{ authors: Author[] }>;
export type PostAuthorResponse = AxiosResponse<{ author: Author }>;
export type PutAuthorResponse = AxiosResponse<{ author: Author }>;
export type DeleteAuthorResponse = AxiosResponse<{ author: Author }>;
