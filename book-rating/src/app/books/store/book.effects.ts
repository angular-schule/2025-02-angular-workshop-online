import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions);
  #bs = inject(BookStoreService);

  /*testEffect$ = createEffect(() => {
    return interval(1000).pipe(
      map(i => {
        return { type: 'INTERVAL', data: i };
      })
    )
  })*/

    /** TODO
     * - wenn Action loadBooks kommt
     * - dann Buchliste abrufen HTTP
     * - wenn erfolgreich, dann loadBooksSuccess
     * - wenn nicht, dann loadBooksFailure
     */
  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(() => this.#bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: err.message }))),
      ))
    );
  })
}
