import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.users;
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  saveUsers() {
    this.loadUsers().subscribe((res) => (this.users = res));
  }
}
