import { Component, OnDestroy, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './multicast.component.html',
  imports: [HistoryComponent, AsyncPipe, DecimalPipe]
})
export class MulticastComponent implements OnDestroy {

  #mvs = inject(MeasureValuesService);

  readonly listeners = signal<number[]>([]);
  logStream$ = new ReplaySubject<string>();
  #destroy$ = new Subject<void>();
  #listenerId = 1;

  measureValues$: Observable<number>; // später: Subject<number>;

  constructor() {
    /**************!!**************/
    this.measureValues$ = this.#mvs.getValues();
    /**************!!**************/

  }

  addListener() {
    this.listeners.update(listeners => [...listeners, this.#listenerId++]);
  }

  addConsoleListener() {
    const index = this.#listenerId++;
    this.measureValues$.pipe(takeUntil(this.#destroy$)).subscribe(e => this.logStream$.next(`Listener #${index}: ${e}`));
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
  }

}
