import { Injectable } from '@angular/core';
import { Column } from '../models/column.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  columns: Column[];

  private url = 'http://localhost:3000/boards';

  getUrl(boardId: string) {
    return `${this.url}/${boardId}/columns`;
  }

  constructor(private http: HttpClient) {}

  loadColumns(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(this.getUrl(boardId));
  }

  addColumn(boardId: string, column: Partial<Column>): Observable<Column> {
    return this.http.post<Column>(this.getUrl(boardId), column);
  }

  deleteColumn(boardId: string, column: Partial<Column>): Observable<Column> {
    return this.http.delete<Column>(`${this.getUrl(boardId)}/${column._id}`);
  }

  editColumn(boardId: string, column: Partial<Column>): Observable<Column> {
    return this.http.put<Column>(`${this.getUrl(boardId)}/${column._id}`, {
      title: column.title,
      order: column.order,
    });
  }
}
