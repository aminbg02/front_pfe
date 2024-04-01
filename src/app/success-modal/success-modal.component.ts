import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  template: `
    <div class="modal-overlay" [ngStyle]="{ 'display': showModal ? 'block' : 'none' }">
      <div class="modal" [ngStyle]="{ 'display': showModal ? 'block' : 'none' }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registration Successful!</h5>
              <button type="button" class="close" (click)="closeModal()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>You have successfully registered. You will be redirected to the homepage shortly.</p>
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
        align-items: center;
      }

      .modal-content {
        background-color: #fefefe;
        padding: 20px;
        border: 1px solid #888;
        width: 600px;
        max-width: 80%;
        max-height: 80%;
        overflow-y: auto;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }

      .modal-body {
        padding: 20px 0;
        text-align: center;
      }
    `
  ]
})
export class SuccessModalComponent {
  @Input() showModal: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.modalClosed.emit();
  }
}
