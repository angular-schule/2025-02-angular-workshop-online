import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly books = signal<Book[]>([]);

  #rs = inject(BookRatingService);
  #bs = inject(BookStoreService);

  constructor() {
    this.#bs.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });
  }


  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book);
    this.#updateList(ratedBook);
  }

  doDeleteBook(book: Book) {
    this.#bs.delete(book.isbn).subscribe(() => {
      // lokal filtern
      // this.books.update(books => books.filter(b => b.isbn !== book.isbn));

      // ODER: Buchliste neu laden
      this.#bs.getAll().subscribe(books => {
        this.books.set(books);
      });
    });
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
