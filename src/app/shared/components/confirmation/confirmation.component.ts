import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Input() title = '';
  @Output() confirmEvent = new EventEmitter<boolean>();
  onClick(value: boolean) {
    this.confirmEvent.emit(value);
  }
}
