import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
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
      userId: '',
      users: [],
    },
  ];

  constructor(
    private tasksService: TasksService,
    public modalService: ModalServiceService,
    private columnService: ColumnsService
  ) {}

  ngOnInit(): void {
    this.tasksService
      .loadTasks(this.board._id, this.column._id)
      .subscribe((res) => (this.tasks = res));
  }
  confirmIsVisible = false;
  editIsVisible = false;

  onClickDelete() {
    this.modalService.open();
    this.confirmIsVisible = true;
  }
  onClickEdit() {
    this.modalService.open();
    this.editIsVisible = true;
  }

  onColumnFormEvent(data: 'close' | { title: string }) {
    if (data !== 'close') {
      this.columnService
        .editColumn(this.board._id, {
          ...data,
          ...{ order: this.column.order },
        })
        .subscribe((res) => (this.column = res));
    }
    this.editIsVisible = false;
    this.confirmIsVisible = false;
    this.modalService.close();
  }

  onConfirmEvent(data: boolean) {
    if (data) {
      this.columnService
        .deleteColumn(this.board._id, this.column)
        .subscribe(() => this.columnEvent.emit());
    }
  }
}
