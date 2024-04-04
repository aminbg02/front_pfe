import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-changeusername',
  templateUrl: './changeusername.component.html',
  styleUrls: ['./changeusername.component.css']
})
export class ChangeusernameComponent {






  // @ts-ignore
  newUsername: string;
  constructor(private http: HttpClient, private router: Router, public jwtService: JwtService) { }

  changeUsername() {
    const formData = {
      email: this.jwtService.getEmail(),
      new_name: this.newUsername
    };

    this.http.post('http://127.0.0.1:5000/changename', formData)
        .subscribe(
            response => {
              console.log(response);

            },
            error => {
              console.error('Error changing name:', error);


            }
        );
  }


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
}

