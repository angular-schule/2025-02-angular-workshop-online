import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { of } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    const storeMock = {
      getAll: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Wenn jemand BookRatingService anfordert …
        // … wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        { provide: BookStoreService, useValue: storeMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // DOM
    // fixture.nativeElement

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp', () => {
    // ARRANGE
    // Service injecten, das ist aber eigentlich unser ratingMock
    const service = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123', rating: 5 } as Book;

    // Methode überwachen
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // Methode überwachen, das Original wird aber immer noch zur Erzeugung des Werts verwendet
    spyOn(service, 'rateUp').and.callThrough();

    // ACT
    // Komponentenmethode aufrufen
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob Servicemethode aufgerufen wurde
    // expect(service.rateUp).toHaveBeenCalled();
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
