import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {ModifyModalComponent} from "../modifymodal/modifymodal.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-managejobs',
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})

export class ManagejobsComponent implements OnInit {


  constructor(private http: HttpClient,private router: Router, public jwtService: JwtService) { }

  jobs: any[] = [];
  name: string = '';
  id: string='';
  description: string = '';
  // @ts-ignore
  managerId: number ;
  apiUrl = 'http://127.0.0.1:5000';


  @Input() showModal: boolean = false;

  @Input() showModal2: boolean = false;

  @Output() modalClosed = new EventEmitter<void>();
  selectedJobData: any = {};



  ngOnInit() {
    this.fetchJobData();
    this.showModal2 = false;
    this.selectedJobData = JSON.parse(localStorage.getItem('selectedJob') || '{}');
    // @ts-ignore
    this.managerId=this.jwtService.getID()
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


  getID(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // @ts-ignore
      return tokenDecoded.sub.user_id;
    }
    return null;
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

    localStorage.setItem('selectedJob', JSON.stringify(job));
    this.showModal = true;
  }


  deleteModal(job: any) {
    localStorage.setItem('selectedJob', JSON.stringify(job));

    const modelDiv = document.getElementById('myModal')
    if ( modelDiv!=null)
    { modelDiv.style.display="block"}

  }

  closedelModal() {

    const modelDiv = document.getElementById('myModal')
    if ( modelDiv!=null)
    {  localStorage.removeItem('selectedJob');
      modelDiv.style.display="none"}

  }

  navigateToManageJobs() {
    this.router.navigate(['/managejobs'])
  }

  navigateToManageAccount() {
    this.router.navigate(['/manageaccount'])

  }

  getSelectedJobName(): string {
    // @ts-ignore
    const selectedJobData = JSON.parse(localStorage.getItem('selectedJob'));
    if (selectedJobData) {
      return selectedJobData.name;
    } else {
      return '';
    }
  }

  addnewjob() {
    const url = 'http://127.0.0.1:5000/addnewjob';
    const body = {
      name: this.name,
      description: this.description,
      id: this.managerId
    };

    this.http.post(url, body).subscribe(
      (response: any) => {
        if (response.message === 'Job created') {

          const modelDiv = document.getElementById('myModal00');
          if ( modelDiv!=null)
          { modelDiv.style.display="block"}
          const modelDiv2 = document.getElementById('AddModal');
          if ( modelDiv2!=null)
          { modelDiv2.style.display="none"}
        } else if (response.message === 'Job already exists') {
          alert('Job already exists');
        } else if (response.message === 'Error while creating job') {
          alert('Error occurred while creating job');
        } else if (response.message === 'Error while authenticating') {
          alert('Error while authenticating');
        }
      },
      (error) => {
        console.error('Error creating job:', error);
        alert('Error creating job. Please try again.');
      }
    );
  }


  deleteJob(): void {
     const idJ = this.selectedJobData.id;
    if (this.selectedJobData && this.selectedJobData.id) {
      const url = `${this.apiUrl}/deletejob`;
      const body = {
        id: idJ,
        manager_id: this.managerId
      };

      this.http.post(url, body).subscribe(
        (response: any) => {
          if (response.message) {
            if (response.message === 'Deletion successful') {
              alert('Job successfully deleted');
              const modelDiv = document.getElementById('myModal000')
              if ( modelDiv!=null)
                modelDiv.style.display="block" ;
              const modelDiv0 = document.getElementById('myModal')
              // @ts-ignore
              modelDiv0.style.display="none";
            } else if (response.message === 'Error while deleting job') {
              alert('Error occurred while deleting job');
            } else if (response.message === 'Unauthorized to delete this job') {
              alert('Unauthorized to delete this job');
            } else if (response.message === 'Job not found') {
              alert('Job not found');
            } else if (response.message === 'Error while authenticating') {
              alert('Error while authenticating');
            }

          }
        },
        (error) => {
          console.error('Error deleting job:', error);
          alert('Error deleting job. Please try again.');
        }
      );
    }

  }

  openjobmodal() {
    const modelDiv = document.getElementById('AddModal')
    if ( modelDiv!=null)
    { modelDiv.style.display="block"}
  }

  closejobModal() {

    const modelDiv = document.getElementById('AddModal')
    if ( modelDiv!=null)
    {  localStorage.removeItem('selectedJob');
      modelDiv.style.display="none"}
  }

  closemodal() {
    const modelDiv = document.getElementById('myModal00')
    if ( modelDiv!=null)
    {
      modelDiv.style.display="none"}
  }


  navigatetoatbot() {
    this.router.navigate(['/chatbot']); // Navigate to the /login route

  }


  navigateTomanagejusers() {
    this.router.navigate(['/manageusers']); // Navigate to the /signup route
  }

}
