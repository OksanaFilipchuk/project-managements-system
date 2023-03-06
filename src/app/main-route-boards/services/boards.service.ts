import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private url = 'http://localhost:3000/boards';

  constructor(private httpClient: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(this.url);
  }

  addBoard(board: Board): Observable<Board[]> {
    return this.httpClient.post<Board[]>(this.url, board);
  }
}
