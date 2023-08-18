import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list.component';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book/book.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ]
})
export class BooksModule { }
