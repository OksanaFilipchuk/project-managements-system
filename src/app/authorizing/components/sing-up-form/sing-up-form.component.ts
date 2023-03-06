import { Component, EventEmitter, Output } from '@angular/core';
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

  userForm: FormGroup = this.formBuilder.group({
    name: '',
    login: '',
    password: '',
  });

  @Output() signUp = new EventEmitter<User>();

  onSubmit() {
    this.signUp.emit({ ...this.userForm.value });

    // this.authorize.signUpPost({ ...this.userForm.value });
    // console.log({ ...this.userForm.value });
  }

  closeModal() {
    this.modalService.close();
  }
}
