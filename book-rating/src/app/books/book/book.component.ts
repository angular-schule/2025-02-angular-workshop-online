import { Component, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [CurrencyPipe, RatingComponent, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();
  readonly minRating = input(0);
  readonly maxRating = input(10);

  // Output: hier fließen Daten zur Elternkomponente
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();
  readonly delete = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }

  doDelete() {
    if (confirm('Buch löschen?')) {
      this.delete.emit(this.book());
    }
  }
}
