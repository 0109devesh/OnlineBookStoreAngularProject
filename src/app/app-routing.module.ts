import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compo/home/home.component';
import { BookListComponent } from './books/book-list.component';
import { BookComponent } from './books/book/book.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'books/book-list',
        pathMatch: 'full',
      },
      {
        path: 'books/book-list',
        component: BookListComponent,
      },
      {
        path: 'books/book/:id', // Dynamic route parameter
        component: BookComponent, // Replace with the actual component for displaying book details
      },

    ],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

