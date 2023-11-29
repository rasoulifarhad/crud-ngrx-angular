import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBookState } from "./book.model";

// Selectors fetch data from the store and return it as an observable.
export const selectBookStae = createFeatureSelector<IBookState>('book');
export const selectBooksList = createSelector(selectBookStae, (state) => state.books);
export const selectBookIsLoading = createSelector(selectBookStae, (state) => state.isLoading);
