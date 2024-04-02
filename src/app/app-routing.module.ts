import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from "./login/login.component";
import {ManageaccountComponent} from "./manageaccount/manageaccount.component";
import {ManagejobsComponent} from "./managejobs/managejobs.component";
import {DivisionsComponent} from "./divisions/divisions.component";
import {JobsComponent} from "./jobs/jobs.component";
import {ContactComponent} from "./contact/contact.component";
import {ResetpwComponent} from "./resetpw/resetpw.component";
import {ChangeusernameComponent} from  "./changeusername/changeusername.component"
import {ChangeemailComponent} from "./changeemail/changeemail.component"


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'signup', component: SignupComponent ,},
  { path: 'login', component: LoginComponent },
  { path: 'manageaccount', component: ManageaccountComponent },
  { path: 'managejobs', component: ManagejobsComponent },
  { path: 'divisons', component: DivisionsComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'managejobs', component: ManagejobsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resetpw', component: ResetpwComponent },
  { path: 'changeusername', component: ChangeusernameComponent },
  { path: 'changeemail', component: ChangeemailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register RouterModule with the routes array
  exports: [RouterModule]
})
export class AppRoutingModule { }
