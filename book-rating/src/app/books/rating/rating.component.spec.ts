import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent]
    })
    .compileComponents();


    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;

    // Required Input setzen
    fixture.componentRef.setInput('value', 3);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
