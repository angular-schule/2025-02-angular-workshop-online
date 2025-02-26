import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer, take } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Kiel', 'Osnabrück', 'Wien', 'Leipzig')
    // from([1,2,3,4,5])
    // interval(1000)        // ---0---1---2---3---4---5 ...
    // timer(3000)           // ---------0|
    // timer(3000, 1000)     // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)        // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0),
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    // Producer: generiert die Werte
    // wird durchlaufen, wenn `subscribe()`
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      const timer1 = setTimeout(() => {
        sub.next(100);
        console.log('PRODUCER', 100);
      }, 5000);
      const timer2 = setTimeout(() => sub.complete(), 10000);

      // Teardown Logic:
      // // wird ausgeführt, wenn Datenstrom zu Ende ist (unsubscribe oder complete)
      return () => {
        console.log('TEARDOWN');
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    // Observer: hört von außen zu
    const obs: Observer<number> = {
      next:  (e) => console.log('OBSERVER', e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);

    // Observable: Schnittstelle zwischen Producer und Observer
    // Finnische Notation: Konvention, um Observable zu erkennen
    const myObs$ = new Observable(producer);

    // subscribe: Es geht los! Observer übergeben,
    // // intern wird Producer aufgerufen
    // const sub = myObs$.subscribe(obs);

    /*setTimeout(() => {
      sub.unsubscribe();
      console.log('UNSUBSCRIBE');
    }, 3000)*/


    /*myObs$.subscribe(
      e => console.log(e)
    );*/


    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
