import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  private url = 'http://localhost:3000/auth/';
  token = '';
  login = '';

  constructor(private http: HttpClient) {}

  setToken(token: string, login: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('login', login);
    this.token = token;
    this.login = login;
  }
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.token = '';
    this.login = '';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signUp(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}signup`, data);
  }

  signIn(data: User): Observable<User> {
    return this.http.post<User>(`${this.url}signin`, data);
  }
}
