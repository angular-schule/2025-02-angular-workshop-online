import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly books = signal<Book[]>([]);

  #rs = inject(BookRatingService);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 36.9,
        rating: 3
      }
    ]);
  }


  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5].map(e => e) // [1, 2, 3, 4, 5]
    // [1,2,3,4,5,6,7,8,9].filter(e => e > 5) // [6, 7, 8, 9]

    this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b
        }
      });
    });
  }
}
