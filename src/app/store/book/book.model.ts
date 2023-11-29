import { IBook } from "./interfaces/book.interface";

// hold the interface of books store.
export interface IBookState {

  books: IBook[];
  isLoading: boolean;
}
