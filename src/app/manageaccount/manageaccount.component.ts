import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-manageaccount',
  templateUrl: './manageaccount.component.html',
  styleUrls: ['./manageaccount.component.css']
})
export class ManageaccountComponent {

  constructor(private router: Router, public jwtService: JwtService) { }


  changeEmail() {
    this.router.navigate(['/changeemail']);
  }

  changeUsername() {
    this.router.navigate(['/changeusername']);
  }

  resetPassword() {
    this.router.navigate(['/resetpw']);
  }

  navigateToHomePage() {
    this.router.navigate(['/homepage']);

  }
}
