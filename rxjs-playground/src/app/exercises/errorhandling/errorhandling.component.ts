import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Observable } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { DataService } from './data.service';

@Component({
  templateUrl: './errorhandling.component.html',
  imports: [HistoryComponent]
})
export class ErrorhandlingComponent {

  logStream$ = new ReplaySubject<unknown>();
  #ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.#ds.getData().pipe(
      catchError(err => {
        // mit dem Fehler arbeiten
        console.log('CAUGHT:', err);

        // Fehler ersetzen
        // return of('Nichts', 'passiert', '😇');

        // Fehler weiterwerfen
        // return new Observable(sub => sub.error('FEHLER'));
        // return throwError(() => 'EIN FEHLER!');
        throw 'NEIN, EIN FEHLER!!';

        // Fehler verschlucken / ignorieren
        // return new Observable(sub => sub.complete());
        // return of();
        // return EMPTY;
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}
