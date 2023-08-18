import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: '',
  };

  showAlert: boolean = false;
  showError: boolean = false;
  showPassword: boolean = false
  errorMessage: string = '';

@ViewChild('passwordInput') passwordInput!:ElementRef;


  constructor(private appService: AppService, private renderer: Renderer2) {}

  ngOnInit(): void {

    const shouldShowAlert = sessionStorage.getItem('showAlert');
    if (shouldShowAlert === 'true') {
      this.showAlert = true;
      setTimeout(() => {
        this.dismissAlert();
      }, 60000); // 1 minute in milliseconds
    }

  }

  dismissAlert() {
    this.showAlert = false;
    sessionStorage.removeItem('showAlert');
  }


  dismissError() {
    this.showError = false;
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInputType = this.showPassword ? 'text' : 'password';
    this.renderer.setProperty(this.passwordInput.nativeElement, 'type', passwordInputType);
  }


  onSubmit() {
    console.log('form is submitted');

    console.log(this.credentials);

    if (
      this.credentials.email != '' &&
      this.credentials.password != '' &&
      this.credentials.email != null &&
      this.credentials.password != null
    ) {
      console.log('We have to submit the form to server');

      // token generate
      this.appService.generateToken(this.credentials).subscribe(
        (response: any) => {
          
          // success

        //  console.log("from the login component ",response);
          
       //   console.log(response.jwtToken);

          this.appService.loginUser(response.jwtToken, response.username, response.expiration);


         window.location.href = '/';
        },

        (error) => {
          // error
          if (error.status === 401) {
            this.showError = true;
            this.errorMessage = 'Access Denied !! User Not Found!!';
            setTimeout(() => {
              this.dismissError();
            }, 5000); // Hide the error after 5 seconds
          } else {
            console.log(error);
          }
        }


      );
    } else {
      console.log('Fields are empty !!');
    }
  }
}
