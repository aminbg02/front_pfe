import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {ModifyModalComponent} from "../modifymodal/modifymodal.component";

@Component({
  selector: 'app-managejobs',
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})

export class ManagejobsComponent {

  constructor(private http: HttpClient,private router: Router, public jwtService: JwtService) { }

  jobs: any[] = [];
  private apiUrl = 'http://127.0.0.1:5000';


  @Input() showModal: boolean = false;
  @Input() showModal2: boolean = false;


  @Output() modalClosed = new EventEmitter<void>();
  selectedJobData: any = {};



  ngOnInit() {
    this.fetchJobData();
    this.selectedJobData = JSON.parse(localStorage.getItem('selectedJob') || '{}');
  }
  closeModal() {
    this.showModal = false;
    localStorage.removeItem('selectedJob');
    this.modalClosed.emit();
  }
  fetchJobData() {
    this.http.get(`${this.apiUrl}/getalljobs`).subscribe(
      (response: any) => {
        this.jobs = response;
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

  openModal(job: any) {
    this.showModal = false;
    localStorage.setItem('selectedJob', JSON.stringify(job));
    this.showModal = true; }


  deleteModal(job: any) {
    this.showModal2 = false;
    localStorage.setItem('selectedJob', JSON.stringify(job));
    this.showModal2 = true;

  }

  navigateToManageJobs() {
    this.router.navigate(['/managejobs'])
  }

  navigateToManageAccount() {
    this.router.navigate(['/manageaccount'])

  }

}
