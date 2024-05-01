import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent implements  OnInit{
  apiUrl = 'http://127.0.0.1:5000';
  @Input() showModal2: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  selectedJobData: any = {};


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

    if (localStorage.getItem('selectedJob')) {

      // @ts-ignore
      this.selectedJobData = JSON.parse(localStorage.getItem('selectedJob'));
      this.showModal2 = true;
    }
  }


  closeModal() {
    this.showModal2 = false;
    localStorage.removeItem('selectedJob');
    this.modalClosed.emit();
  }

  protected readonly localStorage = localStorage;

  getSelectedJobName(): string {
    // @ts-ignore
    const selectedJobData = JSON.parse(localStorage.getItem('selectedJob'));
    if (selectedJobData) {
      return selectedJobData.name;
    } else {
      return '';
    }
  }


  deleteJob(): void {
    const url = 'http://localhost:8069/deletejob';
    const id = this.selectedJobData.id; // Assuming selectedJobData is available in the component
    const managerId = this.selectedJobData.managerId; // Assuming managerId is available in the component
    const body = {
      id: id,
      manager_id: managerId
    };

    this.http.post(url, body).subscribe(
      (response: any) => {
        if (response.message) {
          if (response.message === 'Deletion successful') {
            alert('Job successfully deleted');
          } else if (response.message === 'Error while deleting job') {
            alert('Error occurred while deleting job');
          } else if (response.message === 'Unauthorized to delete this job') {
            alert('Unauthorized to delete this job');
          } else if (response.message === 'Job not found') {
            alert('Job not found');
          } else if (response.message === 'Error while authenticating') {
            alert('Error while authenticating');
          }
          // Additional handling based on response messages if needed
        }
      },
      (error) => {
        console.error('Error deleting job:', error);
        alert('Error deleting job. Please try again.');
      }
    );
  }



}


