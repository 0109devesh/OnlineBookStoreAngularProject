import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users/user.model';
import { Observable } from 'rxjs';
import { Book } from './books/book.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  //todo  For the Login the user

  //   /auth/login
  // calling the server to generate token

  generateToken(credentials: any) {
    // token generate
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // for login user

  loginUser(token: string, username: string, tokenExpiration: number) {
    console.log('Storing token expiration:', tokenExpiration);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('tokenExpiration', String(tokenExpiration));

    return true;
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('username');
  }

  // to check that is logged in or not
  isLoggedIn() {
    let token = localStorage.getItem('token');
    let tokenExpiration = localStorage.getItem('tokenExpiration'); // Retrieve the expiration timestamp

    //  console.log('Current time:', Date.now());
    // console.log('Token expiration from storage:', tokenExpiration);

    if (
      token == undefined ||
      token === '' ||
      token == null ||
      tokenExpiration == null ||
      Date.now() >= new Date(tokenExpiration).getTime()
    ) {
      this.clearToken();

      return false; // Token has expired or is missing
    } else {
      return true; // Token is valid
    }
  }

  //for logout the user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    return true;
  }

  //for getting the token
  getToken() {
    return localStorage.getItem('token');
  }

  //todo  ----------------------------------------------------
  //todo after login the user then use the below the method

  getCurrentUser() {
    return this.http.get<string>(`${this.baseUrl}/home/current-user`);
  }

  getCurrentUserObj(): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/home/email/${localStorage.getItem('username')}`
    );
  }

  getUser() {
    return this.http.get(`${this.baseUrl}/home/users`);
  }

 
  // todo  ----------------------------------------------------

  // todo  for user registeration use the below method

  registerUser(user: User, httpOptions: any) {
    return this.http.post(
      `${this.baseUrl}/auth/create-user`,
      user,
      httpOptions
    );
  }

  // todo  ----------------------------------------------------

  // todo  for books related the below method

  getBooksList(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books/books-list`);
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/book/${bookId}`);
  }
}
