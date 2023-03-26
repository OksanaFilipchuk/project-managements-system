import { HttpErrorResponse } from '@angular/common/http';
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
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private columnService: ColumnsService,
    public modalService: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.boardService.loadBoards().subscribe({
      next: (boards) => {
        const currentBoard = boards.filter(
          (el) => el._id === this.route.snapshot.params['id']
        )[0];
        this.board = {
          _id: currentBoard._id,
          owner: currentBoard.owner,
          title: currentBoard.title,
          users: currentBoard.users,
        };
        this.columnService.loadColumns(currentBoard._id).subscribe({
          next: (res) => (this.columns = res),
          error: this.showErrorMessage,
        });
      },
      error: this.showErrorMessage,
    });
  }

  goToBoards() {
    this.router.navigate(['Boards']);
  }

  openColumnForm() {
    this.modalService.open();
  }

  showErrorMessage(e: HttpErrorResponse) {
    this.errorMessage = e.message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 1500);
  }

  onColumnFormEvent(data: 'close' | { title: string }) {
    if (data !== 'close') {
      const lastOrder = this.columns.length
        ? this.columns.sort((a, b) => a.order - b.order)[
            this.columns.length - 1
          ].order
        : 0;
      this.columnService
        .addColumn(this.board._id, { ...data, ...{ order: lastOrder + 1 } })
        .subscribe({
          next: () =>
            this.columnService
              .loadColumns(this.board._id)
              .subscribe((res) => (this.columns = res)),
          error: this.showErrorMessage,
        });
    }
    this.modalService.close();
  }

  onColumnEvent() {
    this.columnService.loadColumns(this.board._id).subscribe({
      next: (res) => (this.columns = res),
      error: this.showErrorMessage,
    });
  }
}
