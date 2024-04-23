import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent {
  // @ts-ignore
  newPassword: string;
  // @ts-ignore
  confirmPassword: string;

  constructor(private http: HttpClient, private router: Router, public jwtService: JwtService) { }


  getUserDisplayName(): string {
    const name = this.jwtService.getName();
    const role = this.jwtService.getRole();

    if (role === 'admin') {
      return 'Admin';
    } else if (name) {
      return name;
    } else {
      return 'User';
    }
  }



  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  isUserSignedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/homepage']);
  }

  navigateToDivisons() {
    this.router.navigate(['/divisons']);

  }

  navigateToDJobs() {
    this.router.navigate(['/jobs']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  changePassword(): void {
    if (this.newPassword.length < 8) {
      console.log('Password must be at least 8 characters long');
      return;
    }

    if (!(this.newPassword === this.confirmPassword)) {
      console.log('Passwords do not match');
      return;
    }

    // Continue with the password change logic
    const email = this.jwtService.getEmail();
    if (email) {
      const apiUrl = 'http://localhost:8069/changepassword';
      const payload = {
        email: email,
        new_password: this.newPassword
      };
      this.http.post(apiUrl, payload).subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/homepage']);
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    }
  }

}
