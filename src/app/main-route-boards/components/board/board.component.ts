import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models/board.model';
import { Router } from '@angular/router';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board = {
    _id: '',
    title: '',
    owner: '',
    users: ['', ''],
  };
  @Output() deleteEvent = new EventEmitter<Board>();
  @Output() goToBoardEvent = new EventEmitter<Board>();

  constructor(
    private router: Router,
    public modalService: ModalServiceService,
    private boardsService: BoardsService
  ) {}

  goToBoard() {
    this.goToBoardEvent.emit(this.board);
  }

  onClick() {
    this.deleteEvent.emit(this.board);
  }

  // confirmHandle(value: boolean) {
  //   if (!value) {
  //     this.modalService.close();
  //   } else {
  //     this.boardsService.deleteBoard(this.board).subscribe((res) => {
  //       this.deleteEvent.emit(this.board);
  //       console.log(res);
  //     });
  //   }
  // }
}
