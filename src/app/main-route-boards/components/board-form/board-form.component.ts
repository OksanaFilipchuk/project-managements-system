import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalServiceService
  ) {}
  boardForm: FormGroup = this.formBuilder.group({
    title: '',
    // owner: '',
    user: [''],
  });

  closeModal() {
    this.modalService.close();
  }

  onSubmit() {
    // console.log(this.authorizingComponent.userLogin);
  }

  @Output() closeEvent = new EventEmitter();

  onClick() {
    this.closeEvent.emit();
  }
}
