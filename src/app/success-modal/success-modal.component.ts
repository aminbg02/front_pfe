import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {
  @Input() showModal: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.modalClosed.emit();
  }
}
