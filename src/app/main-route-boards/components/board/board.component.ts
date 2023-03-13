import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { BoardsService } from '../../services/boards.service';
import { ColumnsService } from '../../services/columns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [ModalServiceService],
})
export class BoardComponent implements OnInit {
  board: Board = {
    _id: '',
    owner: '',
    title: '',
    users: [],
  };
  columns: Column[] = [
    {
      _id: '',
      title: '',
      order: 0,
      boardId: '',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private columnService: ColumnsService,
    public modalService: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.boardService.loadBoards().subscribe((boards) => {
      const currentBoard = boards.filter(
        (el) => el._id === this.route.snapshot.params['id']
      )[0];
      this.board = {
        _id: currentBoard._id,
        owner: currentBoard.owner,
        title: currentBoard.title,
        users: currentBoard.users,
      };
      // if (currentBoard._id) {
      this.columnService
        .loadColumns(currentBoard._id)
        .subscribe((res) => (this.columns = res));
      // }
    });
  }

  goToBoards() {
    this.router.navigate(['Boards']);
  }

  openColumnForm() {
    this.modalService.open();
  }

  onColumnFormEvent(data: 'close' | { title: string }) {
    if (data !== 'close') {
      const lastIndex = this.columns.length
        ? this.columns.sort((a, b) => a.order - b.order)[
            this.columns.length - 1
          ].order
        : 0;
      this.columnService
        .addColumn(this.board._id, { ...data, ...{ order: lastIndex + 1 } })
        .subscribe(() =>
          this.columnService
            .loadColumns(this.board._id)
            .subscribe((res) => (this.columns = res))
        );
    }
    this.modalService.close();
  }
  onColumnEvent() {
    this.columnService
      .loadColumns(this.board._id)
      .subscribe((res) => (this.columns = res));
  }
}
