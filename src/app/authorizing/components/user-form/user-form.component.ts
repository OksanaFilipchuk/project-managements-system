import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userData: Partial<User> = {
    login: '',
    _id: '',
    name: '',
  };
  messageVisible = false;
  messageText = `Your profile has been updated`;

  constructor(
    public userService: UsersService,
    public router: Router,
    public modal: ModalServiceService
  ) {
    this.userService.loadUsers().subscribe((res) => console.log(res));
  }

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .subscribe(
        (res) =>
          (this.userData = res.filter(
            (el) => el.login === localStorage.getItem('login')
          )[0])
      );
  }

  userForm = new FormGroup({
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
      Validators.maxLength(20),
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/\d/),
    ]),
  });

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

  closeUserForm() {
    this.router.navigate(['Boards']);
  }

  editProfile() {
    console.log(this.userData._id, this.userForm.value);
    if (this.userData._id && this.userForm.value) {
      this.userService
        .editProfile(this.userData._id, this.userForm.value)
        .subscribe((res) => {
          this.messageVisible = true;
          setTimeout(() => {
            this.messageVisible = false;
          }, 1000);
        });
    }
  }

  openDeleteConfirm() {
    this.modal.open();
  }

  deleteUser(data: boolean) {
    if (data && this.userData._id) {
      this.userService.deleteProfile(this.userData._id).subscribe(() => {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        this.router.navigate(['Welcome']);
      });
    }
    this.modal.close();
  }
}
