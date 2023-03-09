import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-boards-route',
  templateUrl: './boards-route.component.html',
  styleUrls: ['./boards-route.component.scss'],
  providers: [ModalServiceService],
})
export class BoardsRouteComponent implements OnInit {
  boards: Board[] = [];
  confirmVisible = false;
  formVisible = false;
  boardToRemove: Board | null = null;

  constructor(
    private boardsService: BoardsService,
    public modalService: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardsService
      .getBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  deleteBoard(board: Board) {
    this.boardToRemove = board;
    this.modalService.open();
    this.confirmVisible = true;
  }

  onClick() {
    this.modalService.open();
    this.formVisible = true;
  }

  onBoardEvent(data: any) {
    if (data != 'close') {
      this.boardsService.addBoard(data).subscribe((res) => this.getBoards());
    }
    this.modalService.close();
    this.formVisible = false;
  }

  onConfirm(event: boolean) {
    if (event && this.boardToRemove) {
      this.boardsService
        .deleteBoard(this.boardToRemove)
        .subscribe((res) => this.getBoards());
    }
    this.modalService.close();
    this.confirmVisible = false;
    this.boardToRemove = null;
  }

  // closeModal() {
  //   this.modalService.close();
  // }
}
