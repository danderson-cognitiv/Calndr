import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-backdrop" [class.show]="show">
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="close" aria-label="Close" (click)="onClose()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
