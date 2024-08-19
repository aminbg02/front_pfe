import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {HttpClient} from "@angular/common/http";
import { ModalComponent } from '../modal/modal.component'



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private http: HttpClient, private router: Router, public jwtService: JwtService) {
  }

  // @ts-ignore
  name: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  subject: string; // @ts-ignore
  message: string;// @ts-ignore
  showSuccessModal: boolean = false;
  successMessage: string = '';
  showErrorModal: boolean = false;
  errorMessage: string = '';

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





  navigatetoatbot() {
    this.router.navigate(['/chatbot']); // Navigate to the /login route

  }


  navigateTomanagejusers() {
    this.router.navigate(['/manageusers']); // Navigate to the /signup route
  }


  navigateToSignup() {
    this.router.navigate(['/signup']); // Navigate to the /signup route
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the /login route
  }
  navigateToDJobs() {
    this.router.navigate(['/jobs']);
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
  sendEmail() {
    const formData = {
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.http.post('http://127.0.0.1:5000/send_email', formData)
      .subscribe(
        response => {
          console.log(response);
          // Show success modal
          this.showSuccessModal = true;
          this.successMessage = "Your email has been sent, we will be back to you as soon as possible.";
          setTimeout(() => {
            this.router.navigate(['/homepage']);
          }, 10000);
        },
        error => {
          console.error('Error sending email:', error);
          // Show error modal
          this.showErrorModal = true;
          this.errorMessage = "An error occurred.";
        }
      );

  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToManageJobs() {
    this.router.navigate(['/managejobs'])
  }

  navigateToManageAccount() {
    this.router.navigate(['/manageaccount'])

  }


  navigateToJobs() {
    this.router.navigate(['/jobs'])
  }
}
