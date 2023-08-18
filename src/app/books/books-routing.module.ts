import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'book-list',
        component: BookListComponent,
      },
      {
        path: 'book',
        component: BookComponent,
      },
      {
        path: 'book/:bookId',
        component: BookComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
