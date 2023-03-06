import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsRouteComponent } from './pages/boards-route/boards-route.component';
import { BoardsService } from './services/boards.service';

@NgModule({
  declarations: [NewBoardComponent, BoardComponent, BoardsRouteComponent],
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  providers: [BoardsService],
  exports: [BoardsRouteComponent, NewBoardComponent],
})
export class MainRouteBoardsModule {}
