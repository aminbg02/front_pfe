import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  template: `
    <div class="modal-overlay" [ngStyle]="{ 'display': showModal ? 'block' : 'none' }">
      <div class="modal" [ngStyle]="{ 'display': showModal ? 'block' : 'none' }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Login Error!</h5>
              <button type="button" class="close" (click)="closeModal()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="error-message">{{ errorMessage }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: transparent;
      }
      .modal-dialog {
        max-width: 100%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        bottom:20%
      }


      .modal-content {
        background-color: #fefefe;
        margin: 20% auto; /* Adjusted margin to position the modal content higher */
        padding: 10px;
        border: 1px solid #888;
        max-width: 60%;
        height: 250px;
        overflow-y: auto;
      }


      .error-message {
        font-size: 1.2rem;
      }
    `
  ]
})
export class ErrorModalComponent {
  @Input() showModal: boolean = false;
  @Input() errorMessage: string = '';
  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.modalClosed.emit();
  }
}
