import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "src/app/services/book.service";
import * as fromBooks from './index'
import { map, switchMap } from "rxjs";
import { IBook } from "./interfaces/book.interface";


// Here we will manage all side effects from action dispatching. In our case we will be calling the books service to manipulate the data.

@Injectable()
export class BookEffects {

  constructor(private readonly actions$: Actions, private readonly bookService: BookService) {}

  getBooks$ = createEffect( () =>
      this.actions$.pipe(
        ofType(fromBooks.getBooks.type),
        switchMap( () => this.bookService.getBooks() ),
        map((books: IBook[]) => fromBooks.getBooksSuccess({books}))
      )
  );

  createBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromBooks.createBook.type),
        switchMap(({book}) => this.bookService.create(book)),
        map((book: IBook) => fromBooks.createBookSuccess({book}))
      )

  );

  updateBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromBooks.updateBook.type),
        switchMap(({book}) => this.bookService.update(book)),
        map((book: IBook) => fromBooks.updateBookSuccess({book}))
      )

  );
  deleteBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromBooks.deleteBook.type),
        switchMap(({book}) => this.bookService.delete(book)),
        map((book: IBook) => fromBooks.deleteBookSuccess({book}))
      )

  );

}
