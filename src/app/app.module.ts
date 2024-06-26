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
import { ContactComponent } from './contact/contact.component';
import { ModalComponent } from './modal/modal.component';
import { ChangeusernameComponent } from './changeusername/changeusername.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { LoginmodalComponent } from './loginmodal/loginmodal.component';
import { FormmodalComponent } from './formmodal/formmodal.component';
import { ModifyModalComponent } from './modifymodal/modifymodal.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ManageusersComponent } from './manageusers/manageusers.component';



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
    ContactComponent,
    ModalComponent,
    ChangeusernameComponent,
    ResetpwComponent,
    ChangeemailComponent,
    LoginmodalComponent,
    FormmodalComponent,
    ModifyModalComponent,
    DeletemodalComponent,
    ChatbotComponent,
    ManageusersComponent,


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
