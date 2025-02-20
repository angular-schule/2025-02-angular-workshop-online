import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  readonly value = input.required<number>();

  readonly ratingArray = computed(() => new Array(Math.max(Math.round(this.value()) || 0)));
}
