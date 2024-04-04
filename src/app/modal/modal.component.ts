import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() modalType: 'success' | 'error' = 'success';
  @Input() modalMessage: string = '';


  modalTitle: string = '';

  ngOnInit() {
    this.modalTitle = this.modalType === 'success' ? 'Registration  Successful' : 'Login Error';
    this.modalMessage = this.modalType === 'success' ? 'You will be redirceted to the home page shortly!' : 'Login Error';

  }

  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    console.log('Modal closed');
    this.showModal = false;
    this.modalClosed.emit();
  }
}
