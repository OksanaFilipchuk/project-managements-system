import { Component, Output, EventEmitter } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { User } from '../../models/models';
import { AuthorizeService } from '../../services/authorize.service';

@Component({
  selector: 'app-authorizing',
  templateUrl: './authorizing.component.html',
  styleUrls: ['./authorizing.component.scss'],
})
export class AuthorizingComponent {
  token = Boolean(localStorage.getItem('token'));
  isUserNew = true;
  userName = '';
  modalTitle = '';

  constructor(
    public modalService: ModalServiceService,
    private authorizeService: AuthorizeService
  ) {}

  @Output() changeToken = new EventEmitter<{ token: boolean }>();

  toggleToken() {
    this.token = !this.token;
    this.changeToken.emit({ token: this.token });
  }

  showSingUpForm() {
    this.modalService.open();
  }

  closeSingUpForm() {
    this.modalService.close();
  }

  logout() {
    this.userName = '';
    this.toggleToken();
    this.authorizeService.removeToken();
  }

  onSignUp(data: User) {
    this.authorizeService.signUp(data).subscribe((res) => {
      console.log(res);
      this.authorizeService
        .signIn({
          login: res.login,
          password: data.password,
        })
        .subscribe((res) => {
          console.log(res.token);
          if (res.token) {
            this.authorizeService.setToken(res.token);
            this.userName = data.name ? data.name : this.userName;
            this.closeSingUpForm();
            this.toggleToken();
          }
        });
    });
  }
}
