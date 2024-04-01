import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; // Import your HomepageComponent
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from "./login/login.component"; // Import your SignupComponent
import {ManageaccountComponent} from "./manageaccount/manageaccount.component";
import {ManagejobsComponent} from "./managejobs/managejobs.component";
import {DivisionsComponent} from "./divisions/divisions.component";
import {JobsComponent} from "./jobs/jobs.component";


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'signup', component: SignupComponent ,},
  { path: 'login', component: LoginComponent },
  { path: 'manageaccount', component: ManageaccountComponent },
  { path: 'managejobs', component: ManagejobsComponent },
  { path: 'divisons', component: DivisionsComponent },
  { path: 'jobs', component: JobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register RouterModule with the routes array
  exports: [RouterModule]
})
export class AppRoutingModule { }
