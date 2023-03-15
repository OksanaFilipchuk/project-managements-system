import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[];

  private url = 'http://localhost:3000/boards';

  getUrl(boardId: string, columnId: string) {
    return `${this.url}/${boardId}/columns/${columnId}/tasks`;
  }

  constructor(private http: HttpClient) {}

  loadTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url = this.getUrl(boardId, columnId);
    return this.http.get<Task[]>(url);
  }

  addTask(
    boardId: string,
    columnId: string,
    data: Partial<Task>
  ): Observable<Task[]> {
    const url = this.getUrl(boardId, columnId);
    return this.http.post<Task[]>(url, data);
  }

  deleteTask(boardId: string, columnId: string, task: Partial<Task>) {
    const url = `${this.getUrl(boardId, columnId)}/${task._id}`;
    return this.http.delete<Task[]>(url);
  }
}
