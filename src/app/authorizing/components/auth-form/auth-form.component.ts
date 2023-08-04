import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../models/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() isUserNew = true;

  userForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/\d/),
    ]),
  });

  @Output() formEvent = new EventEmitter<User | string>();

  onSubmit() {
    this.formEvent.emit({ ...this.userForm.value });
  }

  closeModal() {
    this.formEvent.emit('close');
  }
  getErrorMessage(field: string): any {
    if (this.userForm.get(field)?.hasError('required')) {
      return 'You must enter a value';
    }
    if (
      this.userForm.get(field)?.hasError('minlength') &&
      field != 'password'
    ) {
      return `The ${field} must be at least 3 characters`;
    }
    if (
      this.userForm.get(field)?.hasError('minlength') &&
      field === 'password'
    ) {
      return `The ${field} must be at least 6 characters`;
    }

    if (this.userForm.get(field)?.hasError('maxlength')) {
      return `Keep the ${field} under 20 characters`;
    }
    if (this.userForm.get(field)?.hasError('pattern')) {
      return `The ${field} should contain at least 1 upper case, 1 lower case character and 1 number`;
    }
  }
}
