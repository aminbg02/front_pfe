import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent {
  @Input() showModal: boolean = false;
  @Input() modalType: 'success' | 'error' = 'success';
  @Input() modalMessage: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  modalTitle: string = '';


  closeModal() {
    console.log('Modal closed');
    this.showModal = false;
    this.modalClosed.emit();
  }

}
