import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards: Board[];

  private url = 'http://localhost:3000/boards';

  constructor(private http: HttpClient) {}

  loadBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url);
  }

  getBoards(): Board[] {
    return this.boards;
  }

  addBoard(board: Board): Observable<Board[]> {
    return this.http.post<Board[]>(this.url, board);
  }

  deleteBoard(board: Board) {
    return this.http.delete<Board[]>(`${this.url}/${board._id}`);
  }

  saveBoards() {
    this.loadBoards().subscribe((boards) => (this.boards = boards));
  }
}
