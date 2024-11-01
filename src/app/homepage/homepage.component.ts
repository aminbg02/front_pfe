import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from "../services/jwt.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  isHovered: boolean;
  // @ts-ignore
  hoveredElement: string;

  constructor(private router: Router, public jwtService: JwtService) {
    this.isHovered = false;
  }
  setHoveredElement(element: string): void {
    this.hoveredElement = element;
  }

  getUserDisplayName(): string {
    const name = this.jwtService.getName();
    const role = this.jwtService.getRole();

    if (role === 'admin') {
      // @ts-ignore
      return this.jwtService.getName();
    } else if (name) {
      return name;
    } else {
      return 'User';
    }
  }



  navigateToSignup() {
    this.router.navigate(['/signup']); // Navigate to the /signup route
  }
  navigateTomanagejusers() {
    this.router.navigate(['/manageusers']); // Navigate to the /signup route
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

  navigateToDJobs() {
    this.router.navigate(['/jobs']);
  }
  navigateToManageJobs() {
    this.router.navigate(['/managejobs']);
  }

  navigateToManageAccount() {
    this.router.navigate(['/manageaccount']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigatePerRole(): void {
    if (this.jwtService.getRole() === 'admin') {
      this.router.navigate(['/managejobs']);
    } else {
      this.router.navigate(['/jobs']);
    }
  }

  redirectToWebpage(url: string): void {
    window.open(url, '_blank'); // Opens the URL in a new tab
  }

  navigatetoatbot() {
    this.router.navigate(['/chatbot']); // Navigate to the /login route

  }
}
