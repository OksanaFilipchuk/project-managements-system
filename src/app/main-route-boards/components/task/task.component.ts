import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ModalServiceService],
})
export class TaskComponent {
  constructor(
    public modalService: ModalServiceService,
    private taskService: TasksService
  ) {}
  @Input() task: Task;
  @Input() boardId: string;
  @Input() columnId: string;
  @Output() deleteTaskEvent = new EventEmitter();
  @Output() editTaskEvent = new EventEmitter();

  showEditTaskForm() {
    this.editTaskEvent.emit(this.task);
  }

  onClickDelete() {
    this.modalService.open();
  }

  onConfirmEvent(data: boolean) {
    if (data) {
      this.taskService
        .deleteTask(this.boardId, this.columnId, this.task)
        .subscribe(() => this.deleteTaskEvent.emit());
    }
    this.modalService.close();
  }
}
