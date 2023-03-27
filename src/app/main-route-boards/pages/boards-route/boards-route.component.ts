import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/authorizing/services/authorize.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-boards-route',
  templateUrl: './boards-route.component.html',
  styleUrls: ['./boards-route.component.scss'],
  providers: [ModalServiceService],
})
export class BoardsRouteComponent implements OnInit {
  boards: Board[];
  confirmVisible = false;
  formVisible = false;
  boardToRemove: Board | null = null;
  errorMessage = '';

  constructor(
    private boardsService: BoardsService,
    public modalService: ModalServiceService,
    private router: Router,
    private authService: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.boardsService.saveBoards();
    this.boardsService.loadBoards().subscribe({
      next: (res) => (this.boards = res),
      error: (error) => {
        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = '';
          this.router.navigate(['Welcome']);
          this.authService.removeToken();
        }, 1500);
      },
    });
  }

  getBoards() {
    this.boards = this.boardsService.getBoards();
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  errorHandle(error: any) {
    this.errorMessage = error.message;
    setTimeout(() => (this.errorMessage = ''), 1500);
  }

  onNewBoardEvent(data: any) {
    if (data != 'close') {
      this.boardsService.addBoard(data).subscribe({
        next: () => {
          this.boardsService.loadBoards().subscribe({
            next: (res) => (this.boards = res),
            error: this.errorHandle,
          });
        },
        error: this.errorHandle,
      });
    }
    this.modalService.close();
    this.formVisible = false;
  }

  onConfirm(event: boolean) {
    if (event && this.boardToRemove) {
      this.boardsService.deleteBoard(this.boardToRemove).subscribe({
        next: () => {
          this.boardsService.loadBoards().subscribe({
            next: (res) => (this.boards = res),
            error: this.errorHandle,
          });
        },
        error: this.errorHandle,
      });
    }
    this.modalService.close();
    this.confirmVisible = false;
    this.boardToRemove = null;
  }
}
