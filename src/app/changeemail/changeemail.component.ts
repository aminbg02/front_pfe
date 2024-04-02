import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css']
})
export class ChangeemailComponent {

    newEmail: any;
    constructor(private http: HttpClient, private router: Router, public jwtService: JwtService) { }

    changeEmail() {
        const formData = {
            old_email: this.jwtService.getEmail(),
            new_email: this.newEmail
        };

        this.http.post('http://127.0.0.1:5000/change_email', formData)
            .subscribe(
                response => {
                    console.log(response);

                },
                error => {
                    console.error('Error changing email:', error);

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
}

