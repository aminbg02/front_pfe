import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() modalType: 'success' | 'error' = 'success';
  @Input() modalMessage: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  modalTitle: string = '';

  constructor( public jwtService: JwtService) { }


  ngOnInit() {
    const name = this.jwtService.getName();

    setTimeout(() => {
      this.modalTitle = this.modalType === 'success' ? 'Login Successful ' + "Amin" : 'Login Error';
      this.modalMessage = this.modalType === 'success' ? 'You will be redirected to the home page shortly!' : 'Login Error';
    }, 8000); // 8000 milliseconds = 8 seconds
  }




  closeModal() {
    console.log('Modal closed');
    this.showModal = false;
    this.modalClosed.emit();
  }

}
