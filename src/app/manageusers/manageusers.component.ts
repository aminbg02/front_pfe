import {Component, NgIterable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit{
  // @ts-ignore
  id: number;
  // @ts-ignore
  name: string;
  // @ts-ignore
  login: string;
  // @ts-ignore
  create_date: string;
  // @ts-ignore
  x_can_edit: boolean;
  private apiUrl = 'http://127.0.0.1:5000';
  // @ts-ignore
  users: User[] = [];


  response: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
  constructor(private http: HttpClient,private router: Router, public jwtService: JwtService) { }


  fetchUsers() {
    this.http.get(`${this.apiUrl}/getallusers`).subscribe(
      (response: any) => {
        this.users = response.map((user: any) => {
          let role = user.x_can_edit ? 'Admin' : 'User'; // Default role based on x_can_edit
          if (user.id === 2) {
            role = 'Admin'; // If id is 2, override the role to Admin
          }
          return {
            ...user,
            role: role
          };
        });
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }


  ngOnInit() {
    this.fetchUsers();
  }
  // @ts-ignore
  deleteuser(user: User) {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    const modelDiv = document.getElementById('myModal');
    if (modelDiv) {
      modelDiv.style.display = "block";
    }
  }


  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if ( modelDiv!=null)
    {
      modelDiv.style.display="none"}
  }

  closedelModal() {
    const modelDiv = document.getElementById('myModal2');
    if ( modelDiv!=null)
    {
      modelDiv.style.display="none"}
  }

  closedelModal3() {
    const modelDiv = document.getElementById('myModal000');
    if ( modelDiv!=null)
    {
      modelDiv.style.display="none"}
  }

  // @ts-ignore
  deleteuser1() {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('selectedUser'));
    const id = user.id;
    const url = `${this.apiUrl}/deleteuser`;
    const body = {
      user_id: id
    };
    this.http.post(url, body).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        const modelDiv = document.getElementById('myModal000');
        if ( modelDiv!=null)
        { modelDiv.style.display="block"}
        const modelDiv2 = document.getElementById('myModal');
        if ( modelDiv2!=null)
        { modelDiv2.style.display="none"}
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Handle error response here
      }
    );

  }
}
