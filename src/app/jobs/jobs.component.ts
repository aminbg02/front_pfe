import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];
  private apiUrl = 'http://127.0.0.1:5000';


  ngOnInit() {
    this.fetchJobData();
  }
  constructor(private http: HttpClient,private router: Router, public jwtService: JwtService) { }

  fetchJobData() {
    this.http.get(`${this.apiUrl}/getalljobs`).subscribe(
      (response: any) => {
        // @ts-ignore
        this.jobs = response.filter(job => job.name !== 'Spontaneous Application');
      },
      (error) => {
        console.error('Error fetching job data:', error);
      }
    );
  }



  stripHtmlTags(description: string): string {
    return description.replace(/<\/?p>/g, '');
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

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToManageJobs() {
    this.router.navigate(['/managejobs'])
  }

  navigateToManageAccount() {
    this.router.navigate(['/manageaccount'])

  }
}
