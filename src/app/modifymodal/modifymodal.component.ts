import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-modifymodal',
  templateUrl: './modifymodal.component.html',
  styleUrls: ['./modifymodal.component.css']
})

export class ModifyModalComponent implements OnInit,OnChanges {
  apiUrl = 'http://127.0.0.1:5000';
  @Input() showModal: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();


  selectedJobData: any = {};

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('selectedJob')) {
    // @ts-ignore
    this.selectedJobData = JSON.parse(localStorage.getItem('selectedJob'));
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    localStorage.removeItem('selectedJob');
    this.modalClosed.emit();
  }

  updateJob(): void {
    if (this.selectedJobData && this.selectedJobData.id) {
      const url = `${this.apiUrl}/updatejob`;
      const body = {
        id: this.selectedJobData.id,
        name: this.selectedJobData.name,
        description: this.selectedJobData.description
      };

      this.http.post(url, body).subscribe(
          (response: any) => {
            if (response.message) {
              alert(response.message);
              localStorage.removeItem('selectedJob');
              this.showModal = false;
              // Add logic to reload the jobs list or navigate to the jobs list page
            }
          },
          (error) => {
            console.error('Error updating job:', error);
            alert('Error updating job. Please try again.');
          }
      );
    } else {
      alert('Please select a job to update.');
    }
  }

  ngOnChanges() {
    if (this.showModal) {
      this.selectedJobData = JSON.parse(localStorage.getItem('selectedJob') || '{}');
    }
  }

}
