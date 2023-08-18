import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookId!: number;
  fetchedBook!: Book;

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = +params.get('bookId')!;

      console.log(typeof this.bookId);

      this.getBook(this.bookId);
      
    });
  }

  getBook(bookId: number) {
    this.appService.getBook(bookId).subscribe(
      (book) => {
        console.log('Response', book);

        this.fetchedBook = book;

      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
