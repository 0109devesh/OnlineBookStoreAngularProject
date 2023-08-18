import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser!: string;

  checkConfirmation!: boolean;


 // loggedIn: boolean = false;
 // currentUser: any;
 // tokenExpiration: string | null = null; // Store token expiration timestamp


  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getCurrentUserName();

    // this.checkTokenStatus(); // Initial token status check
    // setInterval(() => {
    //   this.checkTokenStatus(); // Check token status periodically
    // }, 1000); // Check every 10 seconds (adjust as needed)



  }


  // private checkTokenStatus() {
  //   this.loggedIn = this.appService.isLoggedIn();
  //   if (!this.loggedIn) {
  //     this.currentUser = null; // Clear the user info when not logged in
  //     this.tokenExpiration = null; // Clear token expiration when not logged in
  //   } else {
  //     this.currentUser = localStorage.getItem('username');
  //     this.tokenExpiration = localStorage.getItem('tokenExpiration');
  //   }
  // }










  getCurrentUserName() {
    this.appService.getCurrentUser().subscribe(
      (username) => {
        this.currentUser = username;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  getCurrentUser() {
    this.appService.getCurrentUser().subscribe(
      (username) => {
        this.currentUser = username;
        console.log(username);
        
      },
      (error) => {
        console.log('Error', error);
        this.checkConfirmation = confirm('please login your account');
        console.log(this.checkConfirmation);

        if (this.checkConfirmation) {
          window.location.href = '/users';
        }
      }
    );
  }

  getUser() {
    this.appService.getUser().subscribe(
      (user) => {
        console.log('from dashboard component all user', user);
      },
      (error) => {
        console.log('Error' + error);

        this.checkConfirmation = confirm('please login your account');
        console.log(this.checkConfirmation);

        if (this.checkConfirmation) {
          window.location.href = '/users';
        }
      }
    );
  }

  
}
