import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    public modalService: ModalServiceService,
    private authorizeService: AuthorizeService,
    public usersService: UsersService,
    private filter: FilterByLoginPipe,
    private route: Router
  ) {}

  token = Boolean(localStorage.getItem('token'));
  isUserNew = true;
  userLogin = localStorage.getItem('login');
  userName = this.userLogin
    ? this.filter.transform(this.usersService.getUsers(), this.userLogin)
    : '';
  authFormVisible = false;
  logOutConfirmVisible = false;
  userFormVisible = false;
  errorMessage = '';

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

  showUserForm() {
    this.route.navigate(['User-Form']);
  }

  authorize(data: User | string) {
    if (typeof data === 'string') {
      this.modalService.close();
      this.authFormVisible = false;
    } else {
      if (this.isUserNew) {
        this.authorizeService.signUp(data).subscribe({
          next: (singUpRes) => {
            this.authorizeService
              .signIn({
                login: data.login,
                password: data.password,
              })
              .subscribe({
                next: (res) => {
                  if (res.token) {
                    this.authorizeService.setToken(res.token, data.login);
                    this.modalService.close();
                    this.authFormVisible = false;
                    this.toggleToken();
                    this.usersService.saveUsers();
                    this.userLogin = data.login;
                  }
                },
              });
          },
          error: (error) => {
            this.errorMessage =
              error.status === 409
                ? 'Login already exist'
                : 'Something went wrong. Try again later';
            setTimeout(() => (this.errorMessage = ''), 1500);
          },
        });
      } else {
        this.authorizeService
          .signIn({
            login: data.login,
            password: data.password,
          })
          .subscribe({
            next: (res) => {
              if (res.token) {
                this.authorizeService.setToken(res.token, data.login);
                this.modalService.close();
                this.authFormVisible = false;
                this.toggleToken();
                this.usersService.saveUsers();
                this.userLogin = data.login;
              }
            },
            error: (error) => {
              this.errorMessage =
                error.status === 401
                  ? "The login or password isn't correct"
                  : 'Something went wrong. Try again later';
              setTimeout(() => (this.errorMessage = ''), 1500);
            },
          });
      }
    }
  }
}
