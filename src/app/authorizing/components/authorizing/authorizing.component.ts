import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthorizeService } from '../../services/authorize.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { FilterByLoginPipe } from 'src/app/shared/pipes/filter-by-login.pipe';

@Component({
  selector: 'app-authorizing',
  templateUrl: './authorizing.component.html',
  styleUrls: ['./authorizing.component.scss'],
  providers: [ModalServiceService],
})
export class AuthorizingComponent implements OnInit {
  token = Boolean(localStorage.getItem('token'));
  isUserNew = true;
  userLogin = localStorage.getItem('login');
  userName = this.userLogin
    ? this.filter.transform(this.usersService.getUsers(), this.userLogin)
    : '';
  authFormVisible = false;
  logOutConfirmVisible = false;

  constructor(
    public modalService: ModalServiceService,
    private authorizeService: AuthorizeService,
    public usersService: UsersService,
    private filter: FilterByLoginPipe
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this.usersService.saveUsers();
    }
  }

  @Output() changeToken = new EventEmitter<{ token: boolean }>();

  toggleToken() {
    this.token = !this.token;
    this.changeToken.emit({ token: this.token });
  }

  showSingUpForm() {
    this.isUserNew = true;
    this.modalService.open();
    this.authFormVisible = true;
  }

  showLoginForm() {
    this.isUserNew = false;
    this.modalService.open();
    this.authFormVisible = true;
  }

  // closeSingUpForm() {
  //   this.modalService.close();
  // }

  logout(data: boolean) {
    if (data) {
      this.userName = '';
      this.toggleToken();
      this.authorizeService.removeToken();
    }
    this.modalService.close();
    this.logOutConfirmVisible = false;
  }

  openConfirm() {
    this.modalService.open();
    this.logOutConfirmVisible = true;
  }

  authorize(data: User | string) {
    if (typeof data === 'string') {
      this.modalService.close();
      this.authFormVisible = false;
    } else {
      if (this.isUserNew) {
        this.authorizeService.signUp(data).subscribe((singUpRes) => {
          this.authorizeService
            .signIn({
              login: data.login,
              password: data.password,
            })
            .subscribe((res) => {
              if (res.token) {
                this.authorizeService.setToken(res.token, data.login);
                // this.closeSingUpForm();
                this.modalService.close();
                this.toggleToken();
                this.usersService.saveUsers();
                this.userLogin = data.login;
              }
            });
        });
      } else {
        this.authorizeService
          .signIn({
            login: data.login,
            password: data.password,
          })
          .subscribe((res) => {
            if (res.token) {
              this.authorizeService.setToken(res.token, data.login);
              // this.closeSingUpForm();
              this.modalService.close();
              this.toggleToken();
              this.usersService.saveUsers();
              this.userLogin = data.login;

              // console.log(this.usersComponent.users);
            }
          });
      }
    }
  }
}
