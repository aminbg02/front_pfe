// noinspection AngularMissingOrInvalidDeclarationInModule

import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import { SuccessModalComponent } from '../success-modal/success-modal.component';




@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css' ]
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showErrorModal: boolean = false;
  errorMessage: string = '';
  showSuccessModal: boolean = false;


  constructor(private router: Router ,private authService: AuthService) { }
  private decodeToken(token: string): any {
    const base64Payload = token.split('.')[1];
    const payload = window.atob(base64Payload);
    return JSON.parse(payload);
  }
  showErrorMessage(message: string, error?: any) {
    this.errorMessage = message;
    this.showErrorModal = true;
    console.error(error);
  }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Response from API:', response);

        if (response.token) {

          localStorage.setItem('token', response.token);
          const tokenPayload = this.decodeToken(response.token);
          const userRole = tokenPayload.role;

          this.showSuccessModal = true;


          setTimeout(() => {
            this.router.navigate(['/homepage']);
          }, 3000);
        } else if (response.message) {
          // Handle error messages
          this.showErrorMessage(response.message);
        }
      },
      (error) => {



        console.error(error);
        if (error.status === 401) {
          if (error.error && error.error.message) {
            this.showErrorMessage(error.error.message, error);
          } else {
            this.showErrorMessage('Unauthorized: Incorrect Login', error);
          }
        } else {
          this.showErrorMessage('An error occurred during login', error);
        }
      }
    );
  }



  navigateToSignIn() {
    this.router.navigate(['/signup']); // Navigate to the /signup route
  }

  navigateToHomePage() {
    this.router.navigate(['/homepage']); // Navigate to the /signup route
  }


}

