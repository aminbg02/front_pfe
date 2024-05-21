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
  nbq : number=0;
  spont: boolean = false;
  private apiUrl = 'http://127.0.0.1:5000';
  selectedJob: any; // Assuming this variable holds the selected job from local storage
  questionsData: any[] = [];
  score =0;
  fileName = '';
  // @ts-ignore
  response: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
  // @ts-ignore
  score: number;
  submitted: boolean = false;


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
  closejobmodal2()
  {
    const modelDiv = document.getElementById('myModal2')
    if ( modelDiv!=null)
    {  localStorage.removeItem('selectedJob');
      modelDiv.style.display="none"}
    this.score=0;
    this.submitted=false;
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
      this.spont=true;
      const formData = new FormData();
      // @ts-ignore
      formData.append('pdf_file', this.pdfFile);
      // @ts-ignore
      formData.append('partner_name', this.jwtService.getName());
      // @ts-ignore
      formData.append('email', this.jwtService.getEmail());
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
    this.nbq=this.nbq+1;
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
    const selectedJob = JSON.parse(selectedJobString);
    const job = selectedJob.name;

    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 150;
    const xPosition = (pageWidth - imageWidth) / 2;
    const yPosition = 10;
    const currentDate = new Date();

    // Get the current date in YYYY-MM-DD format
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // Get the current time in HH:MM:SS format
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    doc.addImage('assets/images/s&b1.png', 'PNG', xPosition, yPosition, imageWidth, 50);
    doc.setFontSize(15);

    // Centered Title
    // @ts-ignore
    const titleX = (pageWidth - doc.getStringUnitWidth("Job Application Receipt") * doc.internal.getFontSize() / 2);
    doc.text("Job Application Receipt", 70, 50);
    // @ts-ignore


    // Text Content
    const content = `Hey ${name},\nWe sincerely appreciate you taking the time to apply for the position  \nof ${job}.

      Our team will thoroughly evaluate your qualifications and experience.\nWe will make every effort to get back to you as soon as possible regarding the\n next steps in the selection process . \n We value your interest in our company and the role you have applied for.

      Thank you once again for your application, and we look forward to the \n  possibility of  discussing your candidacy further.`;
    doc.text(content, 10, 90);

    // Date at the bottom right
    const dateX = pageWidth - 50;
    const dateY = doc.internal.pageSize.getHeight() - 10;
    doc.text(`Date: ${formattedDate}`, dateX, dateY);

    // Open the PDF in a new browser tab
    doc.output('dataurlnewwindow');
  }



  generatePdf2() {
    const doc = new jsPDF();
    const name = this.jwtService.getName();
    const email = this.jwtService.getEmail();
    // @ts-ignore
    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 150;
    const xPosition = (pageWidth - imageWidth) / 2;
    const yPosition = 10;
    const currentDate = new Date();

    // Get the current date in YYYY-MM-DD format
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // Get the current time in HH:MM:SS format
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    doc.addImage('assets/images/s&b1.png', 'PNG', xPosition, yPosition, imageWidth, 50);
    doc.setFontSize(15);

    // Centered Title
    // @ts-ignore
    const titleX = (pageWidth - doc.getStringUnitWidth("Job Application Receipt") * doc.internal.getFontSize() / 2);

    // @ts-ignore
    // Text Content
    const content = `Hey ${name},\nWe sincerely appreciate you taking the time submit your resume  \n

      Our team will thoroughly evaluate your qualifications and experience.\n Your resume has been securely saved. We will reach out to you with \n an opportunity as soon as it becomes available.`;
    doc.text(content, 10, 90);

    // Date at the bottom right
    const dateX = pageWidth - 50;
    const dateY = doc.internal.pageSize.getHeight() - 10;
    doc.text(`Date: ${formattedDate}`, dateX, dateY);
    // Open the PDF in a new browser tab
    doc.output('dataurlnewwindow');
  }



  onSubmitForm() {
    // Get the selected job from localStorage
    const selectedJobString = localStorage.getItem('selectedJob');
    // Parse the selected job
    // @ts-ignore
    const selectedJob = JSON.parse(selectedJobString);

    // Get the user's email and name from the JwtService
    const userEmail = this.jwtService.getEmail();
    const userName = this.jwtService.getName();

    // Get the PDF file from the file input

    // Create a FormData object
    const formData = new FormData();
// @ts-ignore
    formData.append('pdf_file', this.pdfFile);
    // @ts-ignore
    formData.append('partner_name', userName);
    // @ts-ignore
    formData.append('email', userEmail);
    const description = this.score.toString() + " out of " + this.nbq.toString();
    console.log(description)
    formData.append('description', description);
    formData.append('job_id', selectedJob.id.toString());
    formData.append('name', selectedJob.name);

    // Make the HTTP POST request to the API
    this.http.post('http://127.0.0.1:5000/applyforjob', formData)
      .subscribe(
        (response) => {
          const doc = new jsPDF();
          const name = this.jwtService.getName();
          const email = this.jwtService.getEmail();
          const selectedJobString = localStorage.getItem('selectedJob');
          // @ts-ignore
          // Handle successful response
          console.log('Application submitted successfully');
        },
        (error) => {
          // Handle error
          console.error('Error submitting application:', error);
        }
      );

  }

}



