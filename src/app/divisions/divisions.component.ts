import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent {

  constructor(private router: Router, public jwtService: JwtService) { }

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
    this.router.navigate(['/signup']); // Navigate to the /signup route
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the /login route
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
}
