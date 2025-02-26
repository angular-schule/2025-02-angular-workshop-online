import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  readonly book = toSignal(this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    // filter((isbn): isbn is string => !!isbn) // Type Guard
    switchMap(isbn => this.#bs.getSingle(isbn))
  ));

}
