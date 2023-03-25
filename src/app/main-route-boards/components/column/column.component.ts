import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { ColumnsService } from '../../services/columns.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [ModalServiceService],
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Input() board: Board;
  @Output() columnEvent = new EventEmitter();

  tasks: Task[] = [
    {
      _id: '',
      title: '',
      order: 0,
      boardId: '',
      columnId: '',
      description: '',
      userId: 0,
      users: [],
    },
  ];

  taskFormAction: 'new' | 'edit';
  taskTaskToEdit: Task;
  userId: string | undefined;

  constructor(
    private tasksService: TasksService,
    public modalService: ModalServiceService,
    private columnService: ColumnsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.board._id && this.column._id) {
      this.tasksService
        .loadTasks(this.board._id, this.column._id)
        .subscribe((res) => (this.tasks = res));
    }
    this.getUserId();
  }
  confirmIsVisible = false;
  editIsVisible = false;
  newTaskFormIsVisible = false;

  onClickDelete() {
    this.modalService.open();
    this.confirmIsVisible = true;
  }

  onClickEdit() {
    this.modalService.open();
    this.editIsVisible = true;
  }

  onClickNewTask() {
    this.modalService.open();
    this.newTaskFormIsVisible = true;
    this.taskFormAction = 'new';
  }

  onColumnFormEvent(data: 'close' | { title: string }) {
    if (data !== 'close') {
      this.columnService
        .editColumn(this.board._id, { ...this.column, ...data })
        .subscribe((res) => (this.column = res));
    }
    this.editIsVisible = false;
    this.modalService.close();
  }

  onConfirmEvent(data: boolean) {
    if (data) {
      this.columnService
        .deleteColumn(this.board._id, this.column)
        .subscribe(() => this.columnEvent.emit());
      this.tasks.forEach((el) =>
        this.tasksService
          .deleteTask(this.board._id, this.column._id, el)
          .subscribe(() => {
            this.tasks = [];
          })
      );
    }
    this.modalService.close();
    this.confirmIsVisible = false;
  }

  getUserId() {
    this.userService
      .loadUsers()
      .subscribe(
        (res) =>
          (this.userId = res.filter(
            (el) => el.login === localStorage.getItem('login')
          )[0]._id)
      );
  }

  onTaskFormEvent(data: 'close' | Partial<Task>) {
    if (data != 'close' && this.taskFormAction === 'new') {
      const lastOrder = this.tasks.length
        ? this.tasks.sort((a, b) => a.order - b.order)[this.tasks.length - 1]
            .order
        : 0;
      this.tasksService
        .addTask(this.board._id, this.column._id, {
          ...{
            order: lastOrder + 1,
            userId: 0,
            users: this.board.users,
          },
          ...data,
        })
        .subscribe(() =>
          this.tasksService
            .loadTasks(this.board._id, this.column._id)
            .subscribe((res) => (this.tasks = res))
        );
    }
    if (data != 'close' && this.taskFormAction === 'edit') {
      this.tasksService
        .updateTask(
          this.board._id,
          this.column._id,
          this.taskTaskToEdit,
          data,
          this.userId,
          this.board.users
        )
        .subscribe(() =>
          this.tasksService
            .loadTasks(this.board._id, this.column._id)
            .subscribe((res) => (this.tasks = res))
        );
    }
    this.modalService.close();
    this.newTaskFormIsVisible = false;
  }

  updateTasks() {
    this.tasksService
      .loadTasks(this.board._id, this.column._id)
      .subscribe((res) => (this.tasks = res));
  }

  openEditTaskForm(task: Task) {
    this.taskFormAction = 'edit';
    this.modalService.open();
    this.newTaskFormIsVisible = true;
    this.taskTaskToEdit = task;
  }
}
