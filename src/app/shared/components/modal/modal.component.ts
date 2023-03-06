import { Component, Input } from '@angular/core';
import { ModalServiceService } from '../../services/modal-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title = '';
  // @Input() submitButton = '';

  constructor(public modalService: ModalServiceService) {}
}
