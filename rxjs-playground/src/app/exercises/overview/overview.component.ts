import { Component } from '@angular/core';

import { ExerciseEntry, exercisesList } from '../exercises';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'rxw-overview',
  templateUrl: './overview.component.html',
  imports: [RouterLink, DatePipe]
})
export class OverviewComponent {
  readonly exercises: ExerciseEntry[] = exercisesList;
  readonly generationDate = 1740216279515;
}
