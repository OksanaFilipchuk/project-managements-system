import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/models';

@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.scss'],
})
export class SingUpFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalServiceService
  ) {}

  @Input() isUserNew = true;

  userForm: FormGroup = this.formBuilder.group({
    name: '',
    login: '',
    password: '',
  });

  @Output() authEvent = new EventEmitter<User>();

  onSubmit() {
    this.authEvent.emit({ ...this.userForm.value });
  }

  closeModal() {
    this.modalService.close();
  }
}
