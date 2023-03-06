import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  private url = 'http://localhost:3000/auth/';

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

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  removeToken() {
    localStorage.removeItem('token');
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

  //   fetch('http://localhost:3000/auth/signup', {method: "POST", headers:{'accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify({
  //   "name": "plo",
  //   "login": "plo",
  //   "password": "Tesla4ever"
  // })}).then(res=>res.json()).then(res=>console.log(res))
}
