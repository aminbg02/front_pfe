import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  ngOnInit() {
    this.modalTitle = this.modalType === 'success' ? 'Login  Successful' : 'Login Error';
    this.modalMessage = this.modalType === 'success' ? 'You will be redirceted to the home page shortly!' : 'Login Error';

  }




  closeModal() {
    console.log('Modal closed');
    this.showModal = false;
    this.modalClosed.emit();
  }

}
