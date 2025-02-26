import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectBooks = createSelector(selectBookState, state => state.books);

export const selectLoading = fromBook.bookFeature.selectLoading;

/*
const myState = {
  book: {
    loading: true,
    books: []
  },
  admin: {
    foo: ''
  }
}


const result = selectLoading(myState);
*/
