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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

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
