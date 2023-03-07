import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsRouteComponent } from './pages/boards-route/boards-route.component';
import { BoardsService } from './services/boards.service';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { SharedModule } from '../shared/shared.module';
import { ModalServiceService } from '../shared/services/modal-service.service';

@NgModule({
  declarations: [
    NewBoardComponent,
    BoardComponent,
    BoardsRouteComponent,
    BoardFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [BoardsService, ModalServiceService],
  exports: [BoardsRouteComponent, NewBoardComponent],
})
export class MainRouteBoardsModule {}
