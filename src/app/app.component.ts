import { Component, OnInit } from '@angular/core';

import * as fromBooks from './store/book/index';
import { Observable } from 'rxjs';
import { IBook } from './store/book/interfaces/book.interface';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  books$!: Observable<IBook[]>;

  isLoading$!: Observable<boolean>;

  constructor(private readonly store: Store) {

  }

  ngOnInit(): void {
      this.initDispatch();
      this.initSubscription();
  }

  private initDispatch() {
    this.store.dispatch(fromBooks.getBooks());
  }

  private initSubscription() {
   this.books$ = this.store.pipe(select(fromBooks.selectBooksList));
   this.isLoading$ = this.store.pipe(select(fromBooks.selectBookIsLoading));
  }


  onCreateBook(name: string) : void {
    this.store.dispatch(fromBooks.createBook({
      book: {
        id: Math.random(),
        name
      }
    }));
  }

  onUpdateBook(book: IBook) : void {
    this.store.dispatch(fromBooks.updateBook({book}));
  }

  onDeleteBook(book: IBook) : void {
    this.store.dispatch(fromBooks.deleteBook({book}));
  }

}
