import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Holds the list of books

  ngOnInit(): void {
    console.log('from the ng oninit');

   this.getBooksList();
  }

  constructor(private appService: AppService) {}

  getBooksList() {
    return this.appService.getBooksList().subscribe(
      (books: Book[]) => {
        this.books = books;

        // console.log('from the books-list component ', book);
      },
      (error) => {

        console.log('Error', error);

      }
    );
  }
}
