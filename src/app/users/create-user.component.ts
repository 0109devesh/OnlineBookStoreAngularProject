import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../app.service';
import { User } from './user.model';

// Define the custom validator function outside the component class
function passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password')?.value;

  const confirmPassword = group.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  regForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      // Apply the custom validator using setValidators
      validators: [passwordMatchValidator],
    }
  );

  get nameControl(): FormControl {
    return this.regForm.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.regForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.regForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.regForm.get('confirmPassword') as FormControl;
  }

  registerUser() {
    console.log(this.regForm.value);

    const user: User = {
      name: this.regForm.value.name,
      email: this.regForm.value.email,
      password: this.regForm.value.password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as const, // Set the responseType to 'text'
    };
  

    this.appService.registerUser(user, httpOptions).subscribe(
      (response) => {
        console.log('User registered successfully.', response);

        // After successful registration and before navigating
sessionStorage.setItem('showAlert', 'true');
// Navigate to the login page

        window.location.href = '/users/login';

      },
      (error) => {
        console.error('Error registering user:', error);

        console.log(error);
        
      }
    );
  }
}
