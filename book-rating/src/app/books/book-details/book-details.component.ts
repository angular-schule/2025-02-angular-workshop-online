import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);
    });
  }
}

/*
TODO:
- ISBN aus der URL auslesen
- HTTP Daten laden
- Buch anzeigen
*/
