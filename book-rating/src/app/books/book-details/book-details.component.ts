import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    this.#route.paramMap.pipe(
      map(params => params.get('isbn')),
      filter(isbn => isbn !== null),
      // filter((isbn): isbn is string => !!isbn) // Type Guard
      switchMap(isbn => this.#bs.getSingle(isbn))
      // TODO: takeUntil …
    ).subscribe(book => {
      this.book.set(book);
    });
  }
}

/*
TODO:
- ISBN aus der URL auslesen
- HTTP Daten laden
- Buch anzeigen
*/
