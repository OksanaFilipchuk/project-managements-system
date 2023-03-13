import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models/board.model';
import { Router } from '@angular/router';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-icon',
  templateUrl: './board-icon.component.html',
  styleUrls: ['./board-icon.component.scss'],
})
export class BoardIconComponent {
  @Input() board: Board = {
    _id: '',
    title: '',
    owner: '',
    users: ['', ''],
  };
  @Output() deleteEvent = new EventEmitter<Board>();
  // @Output() goToBoardEvent = new EventEmitter<Board>();

  constructor(
    private router: Router,
    public modalService: ModalServiceService,
    private boardsService: BoardsService
  ) {}

  goToBoard() {
    this.router.navigate([`Boards/${this.board._id}`]);
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
