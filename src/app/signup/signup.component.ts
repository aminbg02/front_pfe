import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { SuccessModalComponent } from '../success-modal/success-modal.component'



import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  // @ts-ignore
  showSuccessModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  errorMessage: string = '';

  name: string = '';
  email: string = '';
  password: string = '';


  onSubmit() {
    this.authService.signup(this.name, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Response from API:', response);
        if (response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
          // Navigate to the homepage or any other desired route
          this.showSuccessModal = true;
          // Navigate to the homepage after 10 seconds
          setTimeout(() => {
            this.router.navigate(['/homepage']);
          }, 10000);
        } else if (response.message) {
          // Handle error messages
          this.errorMessage = response.message;
        }
      },
      (error: any) => {
        // Handle signup error
        console.error(error);
        if (error.status === 409) {
          // Handle the "User already exists" error
          this.errorMessage = 'User already exists';
        } else {
          this.errorMessage = 'An error occurred during signup';
        }
      }
    );
  }


  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the /signup route
  }

  navigateToHomePage() {
    this.router.navigate(['/homepage']); // Navigate to the /signup route
  }
}
