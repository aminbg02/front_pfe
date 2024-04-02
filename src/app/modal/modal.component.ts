import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() modalType: 'success' | 'error' = 'success';
  @Input() modalMessage: string = '';

  modalTitle: string = '';

    ngOnInit() {
        console.log('Modal component initialized');
        this.modalTitle = this.modalType === 'success' ? 'Success' : 'Error';
    }

  @Output() modalClosed = new EventEmitter<void>();

    closeModal() {
        console.log('Modal closed');
        this.showModal = false;
        this.modalClosed.emit();
    }
}
