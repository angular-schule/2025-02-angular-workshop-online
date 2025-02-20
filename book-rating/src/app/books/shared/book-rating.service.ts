import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, 5)
    };
  }

  rateDown(book: Book): Book {
    if (book.rating <= 1) {
      return book;
    }

    const newRating = book.rating - 1;

    return {
      ...book,
      rating: newRating
    };
  }
}
