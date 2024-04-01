import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ManageaccountComponent } from './manageaccount/manageaccount.component';
import { ManagejobsComponent } from './managejobs/managejobs.component';
import { JobsComponent } from './jobs/jobs.component';

import { DivisionsComponent } from './divisions/divisions.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomepageComponent,
    LoginComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    ManageaccountComponent,
    ManagejobsComponent,
    JobsComponent,
    DivisionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  FormsModule,HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
