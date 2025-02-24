import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad (fast) immer pathMatch:full notwendig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // ...booksRoutes,
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  },
  { path: '**', component: ErrorComponent }
];
