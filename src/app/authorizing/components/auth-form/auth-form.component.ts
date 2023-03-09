import { Component, EventEmitter, Output, Input } from '@angular/core';
// import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  // providers: [ModalServiceService],
})
export class AuthFormComponent {
  constructor(
    private formBuilder: FormBuilder
  ) // public modalService: ModalServiceService
  {}

  @Input() isUserNew = true;

  userForm: FormGroup = this.formBuilder.group({
    name: '',
    login: '',
    password: '',
  });

  @Output() formEvent = new EventEmitter<User | string>();

  onSubmit() {
    this.formEvent.emit({ ...this.userForm.value });
  }

  closeModal() {
    // this.modalService.close();
    this.formEvent.emit('close');
  }
}
