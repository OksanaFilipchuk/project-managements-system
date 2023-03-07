import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';

@Component({
  selector: 'app-boards-route',
  templateUrl: './boards-route.component.html',
  styleUrls: ['./boards-route.component.scss'],
})
export class BoardsRouteComponent implements OnInit {
  boards: Board[] = [];

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

  addNewBoard() {
    this.modalService.open();
  }

  closeModal() {
    this.modalService.close();
  }
}
