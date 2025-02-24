import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  #router = inject(Router);
  #bs = inject(BookStoreService);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
  });

  isInvalid(control: FormControl): boolean {
    return control.touched && control.invalid;
  }

  hasError(control: FormControl, errorCode: string): boolean {
    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    // Buch erzeugen
    const newBook: Book = this.bookForm.getRawValue();

    this.#bs.create(newBook).subscribe({
      next: receivedBook => {
        // this.#router.navigate(['/books']);
        this.#router.navigate(['/books', receivedBook.isbn]);
      },
      error: (err: HttpErrorResponse) => { /* ... */ }
    });
  }
}


/*
TODO
- Fehlermeldungen anzeigen
  - "Die ISBN ist ungültig."
  - "Die ISBN ist zu kurz."
- Abschicken
- Button deaktivieren
- Buch erzeugen
*/
