import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";
import {jwtDecode} from "jwt-decode";
// @ts-ignore
import jsPDF, {jspdf} from 'jspdf'

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];

  private apiUrl = 'http://127.0.0.1:5000';
  selectedJob: any; // Assuming this variable holds the selected job from local storage
  questionsData: any[] = [];
  score =0;
  fileName = '';
  // @ts-ignore
  response: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
  // @ts-ignore
  score: number;
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


  ApplyModal() {

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
   closejobmodal()
   {
     const modelDiv = document.getElementById('myModal2')
     if ( modelDiv!=null)
     {  localStorage.removeItem('selectedJob');
       modelDiv.style.display="none"}
     this.score=0;
   }
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    // @ts-ignore
    this.pdfFile = file;
  }

  sendPdfToServer(pdfFile: File) {
    console.log("gg")
    const formData = new FormData();
    formData.append('pdf_file', pdfFile);
    formData.append('partner_name', 'John Doe');
    formData.append('email', 'johndoe@example.com');
    formData.append('skills_list', 'skill1, skill2, skill3');

    this.http.post('/spontaneousapplication', formData).subscribe(

      (response) => {
        console.log('Application submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting application:', error);
      }
    );
  }
  submitApplication() {
    // @ts-ignore
    if (this.pdfFile) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('pdf_file', this.pdfFile);
      formData.append('partner_name', 'John Doe');
      formData.append('email', 'johndoe3@example.com');
      formData.append('skills_list', 'skill1, skill2, skill3');

      this.http.post('http://127.0.0.1:5000/spontaneousapplication', formData).subscribe(
        (response) => {
          console.log('Application submitted successfully:', response);
          // Add any success handling logic here
        },
        (error) => {
          console.error('Error submitting application:', error);
          // Add error handling logic here
        }
      );
    } else {
      console.error('No file selected.');
      // Add logic to inform the user to select a file
    }}
  // @ts-ignore
  response: any; // Define response variable to hold the data
  ApplyForJob(job: any) {
    localStorage.setItem('selectedJob', JSON.stringify(job));
    const selectedJobString = localStorage.getItem('selectedJob');
    const selectedJob = JSON.parse(selectedJobString || '{}'); // Parse with fallback to empty object
    const modelDiv = document.getElementById('myModal2')
    try {
      setTimeout(() => {
        if (modelDiv != null) {
          modelDiv.style.display = "block";
        }
      }, 40000); // 40 seconds in milliseconds
      const body = { name: selectedJob.name };

      this.http.post("http://127.0.0.1:5000/aaa", body).subscribe(
        (response: any) => {
          console.log(response);
          this.response = response; // Assign response to the variable
        },
        (error) => {
          console.error('Error occurred during POST request:', error);
        }
      );
    } catch (error) {
      console.error('Error parsing job information:', error);
    }
  }




  Getdata() {
    const selectedJobString = localStorage.getItem('selectedJob');
    // @ts-ignore
    const selectedJob1 = JSON.parse(selectedJobString);
    const jobName = selectedJob1.name;
    try {
      // @ts-ignore
      const body = {
        name: jobName
      };

      // @ts-ignore
      this.http.post("http://127.0.0.1:5000/aaa", body).subscribe(
        (response) => {
          console.log(response);
          // @ts-ignore
          response.data.forEach((question) => {
            console.log("Question:", question.question);

            // Access the answers for each question
            // @ts-ignore
            question.answers.forEach((answer) => {
              console.log("Answer:", answer.value);
              console.log("Is Correct:", answer.is_correct);
            });
            console.log("---");
          });
        },
        (error) => {
          console.error('Error occurred during POST request:', error);
        }
      );
    } catch (error) {
      console.error('Error parsing job information:', error);
    }
  }




  // @ts-ignore
  submitApplication2() {
    console.log(this.score)

  }

  isAnswerDisabled: boolean[] = [];
  // @ts-ignore
  updateScore(isCorrect: boolean, questionIndex: number) {
    if (isCorrect) {
      this.score=this.score+1;
    }
    // Disable the radio buttons for this question
    this.isAnswerDisabled[questionIndex] = true;
  }
  generatePdf() {
    const doc = new jsPDF();
    const name = this.jwtService.getName();
    const email = this.jwtService.getEmail();
    const selectedJobString = localStorage.getItem('selectedJob');
    // @ts-ignore
    const job = selectedJobString.name;
    // Calculate the position for the image to be at the middle of the page on the first line
    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 150; // Adjust as needed
    const xPosition = (pageWidth - imageWidth) / 2;
    const yPosition = 10; // Adjust as needed

    // Add the image at the calculated position
    doc.addImage('assets/images/s&b1.png', 'PNG', xPosition, yPosition, imageWidth, 50);

    // Set font size and style for name and email
    doc.setFontSize(14);


    // Calculate the position for name and email
    const nameX = 10;
    const nameY = 80;
    const emailX = 10;
    const emailY = 90;

    // Add name and email to the PDF
    doc.text(`Name: ${name}`, nameX, nameY);
    doc.text(`Email: ${email}`, emailX, emailY);

    // Save the PDF
    doc.save("trial.pdf");
  }



}



